<?php
require_once __DIR__ . '/includes/config/constants.php';
require_once __DIR__ . '/includes/config/session.php';

initializeSession();

if (!isUserLoggedIn()) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - Marfa Trade</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<?php include 'includes/header.php'; ?>

<main>
    <div class="page-container">
        <div class="page-header">
            <h1>Profile</h1>
            <p>Manage your account information</p>
        </div>
        
        <div class="profile-content">
            <div class="profile-card">
                <div class="profile-avatar-section">
                    <div class="avatar-container">
                        <div class="profile-avatar" id="profile-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <button class="delete-avatar-btn" id="delete-avatar-btn" style="display: none;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <button class="upload-btn" id="upload-btn">
                        <i class="fas fa-camera"></i>
                        Change Photo
                    </button>
                    <input type="file" id="avatar-upload" accept="image/*" style="display: none;">
                </div>
                
                <div class="profile-form-section">
                    <form id="profile-form">
                        <div class="form-group">
                            <label for="profile-name">Full Name</label>
                            <input type="text" id="profile-name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="profile-email">Email Address</label>
                            <input type="email" id="profile-email" name="email" readonly>
                        </div>
                        
                        <div class="form-group">
                            <label for="current-password">Current Password</label>
                            <input type="password" id="current-password" name="current_password">
                        </div>
                        
                        <div class="form-group">
                            <label for="new-password">New Password</label>
                            <input type="password" id="new-password" name="new_password">
                        </div>
                        
                        <div class="form-group">
                            <label for="confirm-password">Confirm New Password</label>
                            <input type="password" id="confirm-password" name="confirm_password">
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    
    const uploadBtn = document.getElementById('upload-btn');
    const avatarUpload = document.getElementById('avatar-upload');
    const deleteAvatarBtn = document.getElementById('delete-avatar-btn');
    const profileForm = document.getElementById('profile-form');
    
    uploadBtn.addEventListener('click', () => {
        avatarUpload.click();
    });
    
    avatarUpload.addEventListener('change', function(e) {
        if (e.target.files[0]) {
            uploadProfilePicture(e.target.files[0]);
        }
    });
    
    deleteAvatarBtn.addEventListener('click', function() {
        showConfirmNotification('Remove profile picture?', deleteProfilePicture);
    });
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateProfile();
    });
});

async function loadUserProfile() {
    try {
        const response = await fetch('api/auth/check.php');
        const data = await response.json();
        
        if (data.loggedIn) {
            const user = data.user;
            document.getElementById('profile-name').value = user.name;
            document.getElementById('profile-email').value = user.email;
            
            const avatar = document.getElementById('profile-avatar');
            const deleteBtn = document.getElementById('delete-avatar-btn');
            const uploadBtn = document.getElementById('upload-btn');
            if (user.profile_image && user.profile_image.trim() !== '') {
                avatar.innerHTML = `<img src="${user.profile_image}" alt="Profile">`;
                avatar.classList.remove('has-initials');
                deleteBtn.style.display = 'block';
                uploadBtn.innerHTML = '<i class="fas fa-camera"></i> Change Photo';
            } else {
                const firstLetter = user.name.charAt(0).toUpperCase();
                avatar.innerHTML = firstLetter;
                avatar.classList.add('has-initials');
                deleteBtn.style.display = 'none';
                uploadBtn.innerHTML = '<i class="fas fa-camera"></i> Upload Photo';
            }
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

async function uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('profile_picture', file);
    
    try {
        const response = await fetch('api/profile/upload-picture.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Profile picture updated successfully');
            loadUserProfile();
            if (window.checkUserStatus) {
                window.checkUserStatus();
            }
        } else {
            showError(data.message || 'Error uploading picture');
        }
    } catch (error) {
        console.error('Error uploading picture:', error);
        showError('Server connection error');
    }
}

async function deleteProfilePicture() {
    try {
        const response = await fetch('api/profile/delete-picture.php', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Profile picture removed successfully');
            // Clear file input
            document.getElementById('avatar-upload').value = '';
            loadUserProfile();
            if (window.checkUserStatus) {
                window.checkUserStatus();
            }
        } else {
            showError(data.message || 'Error removing picture');
        }
    } catch (error) {
        console.error('Error deleting picture:', error);
        showError('Server connection error');
    }
}

async function updateProfile() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword && newPassword.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showError('New passwords do not match');
        return;
    }
    
    const formData = new FormData(document.getElementById('profile-form'));
    
    try {
        const response = await fetch('api/profile/update.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Profile updated successfully');
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
            if (window.checkUserStatus) {
                window.checkUserStatus();
            }
        } else {
            showError(data.message || 'Error updating profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        showError('Server connection error');
    }
}

function showSuccess(message) {
    if (typeof showNotification === 'function') {
        showNotification(message, 'success');
    } else {
        alert(message);
    }
}

function showError(message) {
    if (typeof showNotification === 'function') {
        showNotification(message, 'warning');
    } else {
        alert(message);
    }
}

function showConfirmNotification(message, callback) {
    // Create confirmation notification
    const notification = document.createElement('div');
    notification.className = 'notification notification-warning';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-triangle notification-icon"></i>
            <span class="notification-message">Remove profile picture?</span>
            <div class="notification-buttons">
                <button class="btn-yes">Yes</button>
                <button class="btn-no">No</button>
            </div>
        </div>
    `;
    
    const buttons = notification.querySelector('.notification-buttons');
    buttons.style.cssText = `
        display: flex;
        gap: 10px;
        margin-top: 15px;
        justify-content: flex-end;
    `;
    
    const yesBtn = notification.querySelector('.btn-yes');
    const noBtn = notification.querySelector('.btn-no');
    
    yesBtn.style.cssText = `
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    `;
    
    noBtn.style.cssText = `
        background: #6c757d;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    `;
    
    // Add event listeners
    yesBtn.addEventListener('click', () => {
        notification.classList.add('notification-exit');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
        callback();
    });
    
    noBtn.addEventListener('click', () => {
        notification.classList.add('notification-exit');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto hide after 10 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.add('notification-exit');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 10000);
}


</script>

<?php include 'includes/footer.php'; ?>
</body>
</html>