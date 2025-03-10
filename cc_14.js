//Task 2 - Support Tickets Dynamic Addition
function createSupportTicket(customer, issue, priority) {
    //Getting the main container where the support tickets will be added
    let divTicketContainer = document.getElementById('ticketContainer');
    
    //Creating a new div element to represent a support ticket
    const ticketCard = document.createElement('div');
    ticketCard.setAttribute('class','ticket-card');
    
    //Adding the customer's name as a header inside the ticket
    const custName = document.createElement('h2');
    custName.setAttribute('class', 'ticket-header');
    custName.textContent = customer;
    ticketCard.append(custName);
    
    //Adding a paragraph to describe the issue
    const issueDesc = document.createElement('p');
    issueDesc.setAttribute('class', 'issue-description');
    issueDesc.textContent = issue;
    ticketCard.append(issueDesc);

    //Adding a label to show the priority of the issue
    const priorityLabel = document.createElement('p');
    priorityLabel.setAttribute('class', 'priority-label');
    priorityLabel.textContent = `Priority: ${priority}`;
    
    //Applying the default style for tickets with non-high priority
    ticketCard.classList.add('other-priority');
    
    //Adding the priority text to the ticket
    ticketCard.append(priorityLabel);

    //Adding a button that allows the user to resolve the ticket
    const resolveBtn = document.createElement('button');
    resolveBtn.setAttribute('class', 'resolve-btn');
    resolveBtn.textContent = 'Resolve';
    ticketCard.append(resolveBtn); 

    //Task 4 - Support Ticket Resolution with Event Bubbling
    resolveBtn.addEventListener('click', (event) => {
        //Removing the ticket from the webpage when the button is clicked
        ticketCard.remove();
            
        //Prevent click from affecting parent elements (stop event bubbling)
        event.stopPropagation();
    });
    
    //Logs the current ticket's customer name when the ticket is clicked
    ticketCard.addEventListener('click', () => {
        console.log('Clicked On Support Ticket:', custName.textContent);
    });

    //Task 5 - Inline Editing for Support Tickets
    ticketCard.addEventListener('dblclick', () => {
        //Prevents multiple edit inputs from appearing at the same time
        if(ticketCard.querySelector('.save-btn')){
            return;
        }
        
        //Clearing the current ticket content for editing
        ticketCard.innerHTML = '';
    
        //Creating an input field to edit the customer's name
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.value = custName.textContent;
    
        //Creating an input field to edit the issue description
        const issueInput = document.createElement('input');
        issueInput.setAttribute('type', 'text');
        issueInput.value = issueDesc.textContent;
    
        //Creating an input field to edit the priority level (Low, Medium, or High)
        const priorityInput = document.createElement('input');
        priorityInput.setAttribute('type', 'text');
        priorityInput.value = priorityLabel.textContent.replace('Priority: ', '');

        //Creating a save button that updates the ticket with new values
        const saveBtn = document.createElement('button');
        saveBtn.setAttribute('class', 'save-btn');
        saveBtn.textContent = 'Save';
    
        //Adding all the input field and buttons to the ticket with spacing
        ticketCard.appendChild(nameInput);
        ticketCard.appendChild(document.createElement('br'));
        ticketCard.appendChild(issueInput);
        ticketCard.appendChild(document.createElement('br'));
        ticketCard.appendChild(priorityInput);
        ticketCard.appendChild(document.createElement('br'));
        ticketCard.appendChild(saveBtn);
        ticketCard.appendChild(document.createElement('br'));
        ticketCard.appendChild(resolveBtn);
    
        //Updates the ticket with the edited details when the save button is clicked
        saveBtn.onclick = () => {
            //Updates the customer name. If value is not null or empty space, otherwise inform the user with an alert.
            if(nameInput.value != null && nameInput.value.trim() != ''){
                custName.textContent = nameInput.value.trim();
            }
            else{
                alert('Customer name cannot be empty, so putting the old value back');
            }
            
            //Updates the issue description. If value is not null or empty space, otherwise inform the user with an alert.
            if(issueInput.value != null && issueInput.value.trim() != ''){
                issueDesc.textContent = issueInput.value.trim();
            }
            else{
                alert('Issue description cannot be empty, so putting the old value back');
            }
                
            
            //Updates the priority label. If value is not null or empty space, otherwise inform the user with an alert.
            if(priorityInput.value != null && priorityInput.value.trim() != ''){
                priorityLabel.textContent = `Priority: ${priorityInput.value.trim()}`;
            }
            else{
                alert('Priority cannot be empty, so putting the old value back');
            }
            
            //Restores the ticket layout after editing
            ticketCard.innerHTML = '';
            ticketCard.append(custName, issueDesc, priorityLabel, resolveBtn);
            
            //Reapplying styles in case the priority was changed
            styleSingleCard(ticketCard)
        };
    });
    
    //Adding the completed ticket to the ticket container
    divTicketContainer.appendChild(ticketCard);
    
    //Applying styling based on the priority level of the ticket
    styleSingleCard(ticketCard);
    return ticketCard;
}

//When the webpage loads, the initial support tickets are added
document.addEventListener('DOMContentLoaded', function (){
    createSupportTicket('Sherry Wiggins', 'Cannot access account', 'High');
    createSupportTicket('Palmer Barnes', 'Billing issue', 'Medium');
    highlightHighPriorityTickets();
})

//When the "Add Ticket" button is clicked, a new support ticket will be created
//and the appropriate styling will be applied based on the priority level
document.getElementById('addTicketBtn').addEventListener('click', () => {
    const currentTicket = createSupportTicket('Kathie Fuller', 'Software bug report', 'High');
    styleSingleCard(currentTicket);
})

//Task 3 - Highlighting High Priority Tickets
function highlightHighPriorityTickets(){
    //Selecting all the support tickets currently on the page
    const highPriorityTickets = document.querySelectorAll('.ticket-card');
    
    //Converting all tickets to an array and adding priority-based styling to each ticket
    const arrTickets = Array.from(highPriorityTickets);
    arrTickets.forEach((ticket) => {
        styleSingleCard(ticket);
    })
}

//Applies different styles based on the priority level of the ticket
function styleSingleCard(currentCard){
    //Retrieves the priority text from the ticket to determine styling
    const priority = currentCard.querySelector('.priority-label');
        
    //Checks if the priority is "High" and updates the styling
    if(priority.textContent.replace('Priority: ', '').toLowerCase() === 'high'){
        //Removing non-high style
        currentCard.classList.remove('other-priority');
        
        //Applying high-priority style
        currentCard.classList.add('high-priority');
    }
    else{
        currentCard.classList.remove('high-priority');
        currentCard.classList.add('other-priority');
    }
}
