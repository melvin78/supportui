import repository from "@/api/repository";
export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = repository(ctx.$axios)

  const repositories = {
      GetEnquiries: repositoryWithAxios('/Enquiry/enquiries/get-enquiries'),
      GetEnquiryCategory: repositoryWithAxios('/EnquiryCategory/getEnquiryCategory')


  }
  inject('postRepository', repositories)

  // You can reuse the repositoryWithAxios object:
  // inject("userRepository", repositoryWithAxios('/users'));
}
