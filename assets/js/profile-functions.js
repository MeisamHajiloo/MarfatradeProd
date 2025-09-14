// Profile functionality for SPA
async function loadUserProfile() {
  try {
    const response = await fetch('api/auth/check.php');
    const data = await response.json();
    
    if (data.loggedIn) {
      const user = data.user;
      const nameInput = document.getElementById('profile-name');
      const emailInput = document.getElementById('profile-email');
      
      if (nameInput) nameInput.value = user.name;
      if (emailInput) emailInput.value = user.email;
      
      const avatar = document.getElementById('profile-avatar');
      const deleteBtn = document.getElementById('delete-avatar-btn');
      const uploadBtn = document.getElementById('upload-btn');
      
      if (avatar && user.profile_image && user.profile_image.trim() !== '') {
        avatar.innerHTML = `<img src="${user.profile_image}" alt="Profile">`;
        avatar.classList.remove('has-initials');
        if (deleteBtn) deleteBtn.style.display = 'block';
        if (uploadBtn) uploadBtn.innerHTML = '<i class="fas fa-camera"></i> Change Photo';
      } else if (avatar) {
        const firstLetter = user.name.charAt(0).toUpperCase();
        avatar.innerHTML = firstLetter;
        avatar.classList.add('has-initials');
        if (deleteBtn) deleteBtn.style.display = 'none';
        if (uploadBtn) uploadBtn.innerHTML = '<i class="fas fa-camera"></i> Upload Photo';
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
      if (window.router) {
        window.router.checkAuthStatus();
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
      const avatarUpload = document.getElementById('avatar-upload');
      if (avatarUpload) avatarUpload.value = '';
      loadUserProfile();
      if (window.router) {
        window.router.checkAuthStatus();
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
  const newPassword = document.getElementById('new-password')?.value;
  const confirmPassword = document.getElementById('confirm-password')?.value;
  
  if (newPassword && newPassword.length < 6) {
    showError('Password must be at least 6 characters');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    showError('New passwords do not match');
    return;
  }
  
  const profileForm = document.getElementById('profile-form');
  if (!profileForm) return;
  
  const formData = new FormData(profileForm);
  
  try {
    const response = await fetch('api/profile/update.php', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      showSuccess('Profile updated successfully');
      const currentPassword = document.getElementById('current-password');
      const newPasswordInput = document.getElementById('new-password');
      const confirmPasswordInput = document.getElementById('confirm-password');
      
      if (currentPassword) currentPassword.value = '';
      if (newPasswordInput) newPasswordInput.value = '';
      if (confirmPasswordInput) confirmPasswordInput.value = '';
      
      if (window.router) {
        window.router.checkAuthStatus();
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
  const notification = document.createElement('div');
  notification.className = 'notification notification-warning';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-exclamation-triangle notification-icon"></i>
      <span class="notification-message">${message}</span>
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
  
  document.body.appendChild(notification);
  
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