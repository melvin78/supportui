import repository from "@/api/repository";
export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = repository(ctx.$axios)

  const repositories = {
      GetEnquiries: repositoryWithAxios('/Enquiry/enquiries/get-enquiries'),
      GetEnquiryCategory: repositoryWithAxios('/EnquiryCategory/getEnquiryCategory'),
      SaveTicketInformation: repositoryWithAxios('/Ticket/createTicket'),
      GetTicketReportsByUser: repositoryWithAxios('/TicketReportClient/getTicketReportsbyUserId'),
      GetTicketReportsByTicketNo: repositoryWithAxios('/TicketReportClient/getTicketReportsbyTicketno'),
      GetTicketResponseByTicketNo: repositoryWithAxios('/Response/getResponsesByTicketNo'),
      AddResponse:repositoryWithAxios('/Response/AddResponse'),
      GetUnreadMessages:repositoryWithAxios('/Response/UnreadResponses'),
      MarkAsRead:repositoryWithAxios('/Response/markAsRead'),
      GetChatHead:repositoryWithAxios('/Agent/getAgentDetails'),
      GetOpenedTickets:repositoryWithAxios('/Ticket/TicketsOpenedByUser'),
      GetTicketInformation:repositoryWithAxios('/Ticket/GetTicketInformation'),
      SendMessage:repositoryWithAxios('/Chats/SendMessage'),
      GetChatRooms:repositoryWithAxios('/Inbox/getInbox'),
      GetMessages:repositoryWithAxios('/Chats/GetMessages'),
    GetInboxId:repositoryWithAxios('/Inbox/getInboxId'),
    GetSingleRoom:repositoryWithAxios('/Inbox/GetSingleInbox'),
    GetAllAgents:repositoryWithAxios('/Agent/getAgents'),







  }
  inject('postRepository', repositories)

  // You can reuse the repositoryWithAxios object:
  // inject("userRepository", repositoryWithAxios('/users'));
}
