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