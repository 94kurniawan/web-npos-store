<template>
  <div id="container" class="h-full relative bg-gray-200 grid grid-cols-12">
    <div id="leftCol" class="h-full col-span-3 bg-gray-200 overflow-y-auto">
      <side-menu />
    </div>
    <router-view />
  </div>
</template>

<style>
/* #listMenuItems a.router-link-exact-active {
  color: #447246;
} */
</style>

<script>
import SideMenu from "@/views/components/SideMenu.vue";

export default {
  name: "Inventory",
  components: {
    SideMenu,
  },

  data() {
    return {
      rawMaterial: [
        {
          id: 6,
          warehouse_id: null,
          sku: null,
          name: "air mineral",
          stock: 0,
          unit: "pcs",
        },
      ],
    };
  },

  computed: {},

  methods: {
    showMenu() {
      this.$emit("show-menu");
    },
  },

  created() {
    // this.$router.go(-1);
    // this.$router.push("/raw-materials");
  },
};
</script>
