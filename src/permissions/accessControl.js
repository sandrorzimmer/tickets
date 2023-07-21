import AccessControl from 'accesscontrol';

const ac = new AccessControl();

// Define permissions for 'USER' role on all resources
ac
    .grant('user')
    .readAny('priority')
    .readAny('ticketStatus')
    .readAny('ticketType')
    .readAny('userGroup')
    .readAny('userRole')
    .readAny('user')
    .readAny('client')
    .readAny('ticket')

    // Resource: 'ticket'
    .createAny('ticket')
    .updateAny('ticket')
    .deleteAny('ticket');

// Define permissions for 'SUPERVISOR' role on all resources
ac
    .grant('supervisor')
    .extend('user')

    // Resource: 'ticket'
    .createAny('ticket')
    .updateAny('ticket')
    .deleteAny('ticket')

    // Resource: 'client'
    .createAny('client')
    .updateAny('client')
    .deleteAny('client');

// Define permissions for 'ADMIN' role on all resources
ac
    .grant('admin')
    .extend('user')

    // Resource: 'ticket'
    .createAny('ticket')
    .updateAny('ticket')
    .deleteAny('ticket')

    // Resource: 'client'
    .createAny('client')
    .updateAny('client')
    .deleteAny('client')

    // Resource: 'priority'
    .createAny('priority')
    .updateAny('priority')
    .deleteAny('priority')

    // Resource: 'ticketStatus'
    .createAny('ticketStatus')
    .updateAny('ticketStatus')
    .deleteAny('ticketStatus')

    // Resource: 'ticketType'
    .createAny('ticketType')
    .updateAny('ticketType')
    .deleteAny('ticketType')

    // Resource: 'userGroup'
    .createAny('userGroup')
    .updateAny('userGroup')
    .deleteAny('userGroup')

    // Resource: 'userRole'
    .createAny('userRole')
    .updateAny('userRole')
    .deleteAny('userRole')

    // Resource: 'user'
    .createAny('user')
    .updateAny('user')
    .deleteAny('user');

export default ac;