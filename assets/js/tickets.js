// Tickets functionality
function initializeTickets() {
  console.log('Initializing tickets page');
  const newTicketBtn = document.getElementById("new-ticket-btn");
  const newTicketModal = document.getElementById("new-ticket-modal");
  const ticketDetailModal = document.getElementById("ticket-detail-modal");
  const newTicketForm = document.getElementById("new-ticket-form");

  const ticketCards = document.querySelectorAll(".ticket-card");
  const closeBtns = document.querySelectorAll(".close");

  // Open new ticket modal
  if (newTicketBtn) {
    newTicketBtn.addEventListener("click", function () {
      newTicketModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  }

  // Close modals
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      newTicketModal.style.display = "none";
      ticketDetailModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });



  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === newTicketModal) {
      newTicketModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (event.target === ticketDetailModal) {
      ticketDetailModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Submit new ticket
  if (newTicketForm) {
    newTicketForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validate subject length
      const subjectInput = document.getElementById("ticket-subject");
      if (subjectInput.value.length > 120) {
        showError("Subject must not exceed 120 characters");
        return;
      }

      // Validate message length
      const messageInput = document.getElementById("ticket-message");
      if (messageInput.value.length > 2048) {
        showError("Message must not exceed 2048 characters");
        return;
      }

      const formData = new FormData(newTicketForm);

      try {
        const response = await fetch("api/tickets/create.php", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          showSuccess("Ticket created successfully");
          newTicketModal.style.display = "none";
          newTicketForm.reset();

          // Reload tickets and show the new ticket
          setTimeout(() => {
            loadTickets().then(() => {
              if (data.ticket && data.ticket.id) {
                setTimeout(() => {
                  loadTicketDetail(data.ticket.id);
                }, 500);
              }
            });
          }, 1000);
        } else {
          showError(data.message || "Error creating ticket");
        }
      } catch (error) {
        console.error("Error creating ticket:", error);
        showError("Server connection error");
      }
    });
  }

  // Open ticket detail - use event delegation
  document.addEventListener("click", function (e) {
    const ticketCard = e.target.closest(".ticket-card");
    if (ticketCard) {
      console.log('Ticket card clicked:', ticketCard);
      const ticketId = ticketCard.dataset.ticketId;
      console.log('Ticket ID:', ticketId);
      if (ticketId) {
        loadTicketDetail(ticketId);
      } else {
        console.error('No ticket ID found');
      }
    }
  });

  // Load ticket detail
  async function loadTicketDetail(ticketId) {
    console.log('Loading ticket detail for ID:', ticketId);
    try {
      const response = await fetch(`api/tickets/detail.php?id=${ticketId}`);
      console.log('API response:', response);
      const data = await response.json();
      console.log('API data:', data);

      if (data.success) {
        const ticket = data.ticket;
        const replies = data.replies || [];
        const currentUserId = data.current_user_id;

        document.getElementById("ticket-detail-subject").textContent =
          "Ticket Details";

        // Create all messages array (original ticket + replies)
        const allMessages = [
          {
            message: ticket.message,
            created_at: ticket.created_at,
            is_admin: false,
            is_original: true,
            user_id: ticket.user_id,
          },
          ...replies,
        ];

        let content = `<div style="padding: 1.5rem;">`;

        if (allMessages.length > 0) {
          // Group all messages by date
          const messagesByDate = {};
          allMessages.forEach((message) => {
            const messageDate = new Date(message.created_at).toDateString();
            if (!messagesByDate[messageDate]) {
              messagesByDate[messageDate] = [];
            }
            messagesByDate[messageDate].push(message);
          });

          // Display messages grouped by date
          Object.keys(messagesByDate).forEach((dateKey) => {
            const dateMessages = messagesByDate[dateKey];
            const formattedDate = new Date(dateKey).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            content += `<div class="date-separator">${formattedDate}</div>`;

            dateMessages.forEach((message) => {
              const isUserMessage = message.is_original || message.is_admin !== 1;
              const messageTime = new Date(
                message.created_at
              ).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              const backgroundColor = isUserMessage ? "#f5f5f5" : "#e3f2fd";
              const senderLabel = message.is_original
                ? "You (Original)"
                : message.is_admin === 1
                ? "Support"
                : "You";

              content += `
                                <div class="message-container" style="display: flex; align-items: flex-end; margin-bottom: 1rem; ${
                                  isUserMessage
                                    ? "justify-content: flex-start;"
                                    : "justify-content: flex-end;"
                                }">
                                    <div style="display: flex; align-items: flex-end; max-width: 85%; ${
                                      isUserMessage
                                        ? "flex-direction: row;"
                                        : "flex-direction: row-reverse;"
                                    }">
                                        <div class="reply-item" style="padding: 1rem; background: ${backgroundColor}; border-radius: 5px;">
                                            <div style="font-size: 0.85rem; color: #666; margin-bottom: 0.5rem;">
                                                ${senderLabel}
                                            </div>
                                            <div>${message.message.replace(
                                              /\n/g,
                                              "<br>"
                                            )}</div>
                                        </div>
                                        <div class="message-time" style="font-size: 0.75rem; color: #999; ${
                                          isUserMessage
                                            ? "margin-left: 4px;"
                                            : "margin-right: 4px;"
                                        } align-self: center;">${messageTime}</div>
                                    </div>
                                </div>
                            `;
            });
          });
        }

        content += "</div>";

        let replyFormHtml = "";
        if (ticket.status !== "closed") {
          replyFormHtml = `
                        <div class="modal-footer">
                            <form id="reply-form">
                                <input type="hidden" name="ticket_id" value="${ticketId}">
                                <div class="form-group" style="padding: 0; margin-bottom: 15px;">
                                    <label for="reply-message">Your Reply:</label>
                                    <textarea id="reply-message" name="message" rows="4" maxlength="2048" required></textarea>
                                </div>
                                <div style="text-align: right;">
                                    <button type="submit" class="btn-primary">Send Reply</button>
                                </div>
                            </form>
                        </div>
                    `;
        }

        // Update modal header with ticket info
        const modalHeader = ticketDetailModal.querySelector(".modal-header h2");
        if (modalHeader) {
          modalHeader.innerHTML = `
                        <div class="ticket-badges" style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                            <span class="ticket-number">#${
                              ticket.ticket_number
                            }</span>
                            <span class="ticket-status status-${ticket.status}">
                                ${getStatusText(ticket.status)}
                            </span>
                            <span class="ticket-priority priority-${
                              ticket.priority
                            }">
                                ${getPriorityText(ticket.priority)}
                            </span>
                        </div>
                        <div style="margin-top: 8px; font-size: 1.2rem;">${
                          ticket.subject
                        }</div>
                    `;
        }

        document.getElementById(
          "ticket-detail-content"
        ).innerHTML = `<div class="modal-body">${content}</div>${replyFormHtml}`;
        ticketDetailModal.style.display = "block";
        document.body.style.overflow = "hidden";
        
        // Scroll to bottom to show latest messages
        setTimeout(() => {
          const modalBody = document.querySelector('#ticket-detail-modal .modal-body');
          if (modalBody) {
            modalBody.scrollTop = modalBody.scrollHeight;
          }
        }, 100);

        // Add reply form handler
        const replyForm = document.getElementById("reply-form");
        if (replyForm) {
          replyForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Validate reply message length
            const replyMessageInput = document.getElementById("reply-message");
            if (replyMessageInput.value.length > 2048) {
              showError("Reply message must not exceed 2048 characters");
              return;
            }

            await submitReply(new FormData(replyForm), ticketId);
          });
        }
      } else {
        showError(data.message || "Error loading ticket");
      }
    } catch (error) {
      console.error("Error loading ticket detail:", error);
      showError("Server connection error");
    }
  }

  // Submit reply
  async function submitReply(formData, ticketId) {
    try {
      const response = await fetch("api/tickets/reply.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showSuccess("Reply sent successfully");
        await loadTicketDetail(ticketId); // Reload ticket detail
        
        // Scroll to bottom of modal body to show latest reply
        setTimeout(() => {
          const modalBody = document.querySelector('#ticket-detail-modal .modal-body');
          if (modalBody) {
            modalBody.scrollTop = modalBody.scrollHeight;
          }
        }, 100);
      } else {
        showError(data.message || "Error sending reply");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      showError("Server connection error");
    }
  }

  // Helper functions
  function getStatusText(status) {
    const statusTexts = {
      open: "Open",
      in_progress: "In Progress",
      closed: "Closed",
    };
    return statusTexts[status] || status;
  }

  function getPriorityText(priority) {
    const priorityTexts = {
      low: "Low",
      medium: "Medium",
      high: "High",
    };
    return priorityTexts[priority] || priority;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US") +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  // Toggle date group drawer
  window.toggleDateGroup = function (date) {
    const group = document.getElementById("group-" + date);
    const arrow = document.getElementById("arrow-" + date);

    if (group.style.display === "none") {
      group.style.display = "block";
      arrow.style.transform = "rotate(0deg)";
    } else {
      group.style.display = "none";
      arrow.style.transform = "rotate(-90deg)";
    }
  };

  function showSuccess(message) {
    if (typeof showNotification === "function") {
      showNotification(message, "success");
    } else {
      alert(message);
    }
  }

  function showError(message) {
    if (typeof showNotification === "function") {
      showNotification(message, "warning");
    } else {
      alert(message);
    }
  }

  // Load tickets on page load
  const urlParams = new URLSearchParams(window.location.search);
  const groupBy = urlParams.get('group') || 'status';
  loadTickets(groupBy);
  
  // Add event listener to grouping dropdown
  const groupBySelect = document.getElementById('group-by');
  if (groupBySelect) {
    groupBySelect.addEventListener('change', function() {
      loadTickets(this.value);
    });
  }
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTickets);
} else {
  // DOM already loaded, can initialize immediately if elements exist
  if (document.getElementById('tickets-container')) {
    initializeTickets();
  }
}

// Export for manual initialization
window.initializeTickets = initializeTickets;

// Global function for changeGrouping (fallback)
function changeGrouping(groupBy) {
  loadTickets(groupBy);
}

// Load tickets via AJAX
async function loadTickets(groupBy = 'status') {
  const container = document.getElementById('tickets-container');
  const loading = document.getElementById('loading');
  
  if (loading) {
    loading.style.display = 'flex';
  }
  
  // Position loading overlay over container
  if (container && loading) {
    container.style.position = 'relative';
    container.style.minHeight = '200px';
  }
  
  const startTime = Date.now();
  
  try {
    const response = await fetch(`api/tickets/list.php?group=${groupBy}`);
    const data = await response.json();
    
    if (data.success) {
      renderTickets(data.tickets, data.groupBy);
    } else {
      container.innerHTML = '<div class="no-tickets"><i class="fas fa-exclamation-triangle"></i><h3>Error loading tickets</h3><p>' + data.message + '</p></div>';
    }
  } catch (error) {
    container.innerHTML = '<div class="no-tickets"><i class="fas fa-exclamation-triangle"></i><h3>Connection Error</h3><p>Failed to load tickets</p></div>';
  }
  
  // Ensure minimum 2 seconds loading time
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(0, 2000 - elapsedTime);
  
  setTimeout(() => {
    if (loading) {
      loading.style.display = 'none';
    }
  }, remainingTime);
}

// Render tickets HTML
function renderTickets(ticketsGrouped, groupBy) {
  const container = document.getElementById('tickets-container');
  
  if (Object.keys(ticketsGrouped).length === 0) {
    container.innerHTML = '<div class="no-tickets"><i class="fas fa-ticket-alt"></i><h3>No tickets found</h3><p>Create a new ticket to get started</p></div>';
    return;
  }
  
  let html = '';
  
  Object.keys(ticketsGrouped).forEach(groupKey => {
    const tickets = ticketsGrouped[groupKey];
    let groupTitle = '';
    
    switch (groupBy) {
      case 'date':
        groupTitle = new Date(groupKey).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        break;
      case 'priority':
        const priorityLabels = { 'low': 'Low Priority', 'medium': 'Medium Priority', 'high': 'High Priority' };
        groupTitle = priorityLabels[groupKey] || groupKey;
        break;
      case 'status':
      default:
        const statusLabels = { 'open': 'Open Tickets', 'in_progress': 'In Progress', 'closed': 'Closed Tickets' };
        groupTitle = statusLabels[groupKey] || groupKey;
        break;
    }
    
    html += `
      <div class="date-group">
        <div class="date-header" onclick="toggleDateGroup('${groupKey}')">
          <h3>${groupTitle}</h3>
          <div class="date-info">
            <span class="ticket-count">${tickets.length} tickets</span>
            <i class="fas fa-chevron-down date-arrow" id="arrow-${groupKey}"></i>
          </div>
        </div>
        <div class="tickets-grid" id="group-${groupKey}" style="display: block;">
    `;
    
    tickets.forEach(ticket => {
      const statusText = { 'open': 'Open', 'in_progress': 'In Progress', 'closed': 'Closed' };
      const priorityText = { 'low': 'Low', 'medium': 'Medium', 'high': 'High' };
      const ticketTime = new Date(ticket.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      html += `
        <div class="ticket-card" data-ticket-id="${ticket.id}">
          <div class="ticket-header">
            <div class="ticket-title-section">
              <h4>${ticket.subject}</h4>
            </div>
            <div class="ticket-badges">
              <span class="ticket-number">#${ticket.ticket_number}</span>
              <span class="ticket-status status-${ticket.status}">${statusText[ticket.status]}</span>
              <span class="ticket-priority priority-${ticket.priority}">${priorityText[ticket.priority]}</span>
              <span class="ticket-time">${ticketTime}</span>
            </div>
          </div>
          <div class="ticket-preview">${ticket.message}</div>
        </div>
      `;
    });
    
    html += '</div></div>';
  });
  
  container.innerHTML = html;
}




