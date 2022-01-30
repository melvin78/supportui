<template>



</template>

<script>
export default {
  name: "_agent",
  layout: "chat",

  mounted() {
    console.log(this.$route.params.agent)
    console.log(this.$route.params.ticketno)
  }
}
</script>

<style scoped lang="scss">
.app-content-wrapper {
  position: relative;
  display: flex;
  overflow: hidden;
  height: calc(100vh - 200px);

  .app-overlay {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    display: none;
    z-index: 2;
    transition: all 0.3s ease-in;
    @media only screen and (max-width: 959px) {
      &.open {
        display: block;
        transition: all 0.3s ease-in;
      }
    }
  }

  .app-sidebar {
    width: 280px;
    position: relative;
    transition: all 0.3s ease-in;
    @media only screen and (max-width: 959px) {
      position: absolute;
      left: -340px;
      z-index: 5;
      height: calc(100vh - 120px);
      transition: all 0.3s ease-in;
      &.open {
        left: 0;
      }
    }

    .app-sidebar-header {
      padding: 0.75rem 1.25rem;
      margin-bottom: 0;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .app-sidebar-body {
      // overflow-y: scroll;
      // height: 100%;
      padding-top: 3.375rem;
      width: 280px;
    }
  }

  .app-content {
    width: calc(100% - 280px);
    @media only screen and (max-width: 959px) {
      width: 100%;
    }
    // margin-left: 30px;
    .app-header {
      padding: 0.75rem 1.25rem;
      margin-bottom: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .app-body {
      flex: 1 1 auto;
      padding-top: 3.375rem;
      // overflow-y: scroll;
      height: calc(100% - 130px);
    }

    .app-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 130px;
    }
  }
}

.app-icon {
  display: none;
  @media only screen and (max-width: 959px) {
    display: block;
  }
}

.eg-filemanager {
  background-color: #fff;
}

.filemanager-content {
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
}

.apps-wrapper {
  &.--filemanager {
    .nested-sidebar-toggle {
      @media (min-width: 959px) {
        display: none;
      }
    }
  }
}

.fade-up-enter {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up-enter-active {
  transition: all 0.4s ease;
}

.fade-up-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}

.fade-up-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>
