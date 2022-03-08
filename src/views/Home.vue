<template>
  <div id="container" class="h-full relative bg-gray-200 grid grid-cols-12">
    <div id="leftCol" class="h-full p-3 col-span-7 bg-gray-100 overflow-y-auto">
      <div
        class="
          w-full
          px-2
          py-3
          items-center
          sticky
          -top-3
          bg-white
          font-medium
          text-center
        "
      >
        ITEMS
      </div>
      <!-- versi 1 List View-->
      <div v-if="viewItems === 'list'" class="pb-10">
        <!-- Header -->
        <div
          class="
            grid grid-cols-12
            gap-0.5
            py-2
            px-3
            rounded-sm
            bg-gray-500
            text-white
            sticky
            top-8
            items-center
          "
        >
          <div class="col-span-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 absolute top-1.5 left-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              />
            </svg>
            <input
              @keyup="searchItem()"
              v-model="search"
              onfocus="this.select();"
              class="
                w-full
                text-base
                pl-9
                py-2
                border border-gray-400
                rounded-l
                bg-gray-50
                focus:outline-none
                text-black
              "
              type="text"
              placeholder="Cari Item"
            />
          </div>
          <div class="col-span-3">
            <select
              v-model="filterItemsBy"
              @change="searchItem()"
              class="
                right-2
                outline-none
                rounded-r
                shadow
                text-gray-700
                bg-yellow-200
                p-2.5
                w-full
              "
            >
              <option :value="null">ALL CATEGORY</option>
              <option
                v-for="category in categories"
                :key="category.key"
                :value="category.id"
              >
                {{ category.name.toUpperCase() }}
              </option>
            </select>
          </div>
          <!-- <div class="col-span-2 text-right">Stok</div> -->
          <div class="col-span-5 text-right">Harga Dine in</div>
        </div>
        <!-- Content -->
        <!-- category -->
        <!-- <div class="my-1 p-3 rounded-sm bg-white sticky top-14">
          <div class="font-medium underline flex">
            Kategori 1
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mt-auto ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div> -->
        <!-- items -->
        <div
          v-for="item in searchResult"
          :key="item.key"
          @click="showModalItemOptions(item)"
          class="
            grid grid-cols-12
            my-1
            px-3
            py-5
            bg-white
            hover:bg-gray-100
            active:bg-gray-200
            shadow-md
          "
        >
          <div class="col-span-7">{{ item.name }}</div>
          <!-- <div class="col-span-2 text-right">{{ item.stock }}</div> -->
          <div class="col-span-5 text-right">
            {{ currency(item.sales_types[0].price) }}
          </div>
        </div>
      </div>
    </div>

    <cart
      :cart="cart"
      :items="items"
      :discounts="discounts"
      @save-edit-item="saveEditItem"
      @reset-cart="resetCart"
      @select-items="selectItemsFromSavedOrders"
    ></cart>

    <!-- modal item options -->
    <modal-item-options
      :item="temporaryItem"
      :discounts="discounts"
      @save-item="saveItem"
      @currency="currency"
    ></modal-item-options>

    <!-- modal info -->
    <modal-info :message="messageInfo" />

    <!-- Menu (Absolute Template) -->
    <button
      @click="showMenu()"
      type="submit"
      class="absolute top-6 left-4 z-20"
    >
      <svg
        v-if="showSideMenu === false"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-if="showSideMenu === true"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div v-if="showSideMenu === true" class="absolute h-full w-full">
      <div
        id="sideMenuHome"
        @click="closeMenuWindow()"
        class="h-full bg-gray-500 bg-opacity-40 grid grid-cols-12"
      >
        <div class="h-full col-span-3 bg-gray-200 overflow-y-auto">
          <side-menu />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideMenu from "@/views/components/SideMenu.vue";
import ModalItemOptions from "@/views/components/ModalItemOptions.vue";
import ModalInfo from "@/views/components/ModalInfo.vue";
import Cart from "@/views/components/Cart.vue";
import * as numberFormat from "@/custom_package/number.js";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Home",
  components: {
    SideMenu,
    ModalItemOptions,
    ModalInfo,
    Cart,
  },

  data() {
    return {
      valueRR: 10000,
      token: localStorage.getItem("token"),

      showSideMenu: false,

      viewItems: "list",

      discounts: [],

      items: [],

      categories: [],

      filterItemsBy: null,

      search: "",
      searchResult: [],

      temporaryItem: {
        name: "",
        variants: [{ id: null }], //
        variant: {}, //
        variant_id: null,
        options: [{ id: null }], //
        option: {}, //
        option_id: null,
        discount: {}, //
        discount_id: null,
        quantity: 1, //
        sales_type: {
          additional_cost: [
            {
              name: "",
            },
          ],
        }, //
        sales_type_id: null,
        price: null,
        id: null,
        sub_total: null,
        total_additional_cost: null,
        additional_cost: [
          {
            name: "",
            total: null,
          },
        ],
      },

      cart: [],

      messageInfo: "",
    };
  },

  methods: {
    resetCart() {
      this.cart = [];
    },
    currency(number) {
      return numberFormat.currency(number);
    },
    thousandSeparator(number) {
      return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
      }).format(number);
    },

    showItemsByCategory() {
      let filterBy = JSON.stringify(this.filterItemsBy);
      let items = [];
      if (filterBy == "null") {
        items = this.items;
      } else {
        items = this.items.filter((item) => {
          let category = JSON.stringify(item.store_category_id);
          return category.includes(filterBy);
        });
      }
      return items;
    },

    searchItem() {
      let name = this.search;
      let itemsFilterByCategory = this.showItemsByCategory();
      if (name == "") {
        name = null;
        this.searchResult = itemsFilterByCategory;
      } else {
        this.searchResult = itemsFilterByCategory.filter((item) => {
          let data = item.name.toLowerCase();
          return data.includes(name.toLowerCase());
        });
      }
    },

    showMenu() {
      if (this.showSideMenu === false) {
        this.showSideMenu = true;
      } else {
        this.showSideMenu = false;
      }
    },

    closeMenuWindow() {
      let win = document.getElementById("sideMenuHome");
      if (window.event.target == win) {
        this.showSideMenu = false;
      }
    },

    changeViewItems(select) {
      this.viewItems = select;
    },

    showModalItemOptions(item) {
      let modal = document.getElementById("my-modal");
      modal.style.display = "block";
      this.temporaryItem = item;
    },

    showModalInfo(message) {
      this.messageInfo = message;
      let modal = document.getElementById("modal-info");
      modal.style.display = "block";
    },

    saveItem(item) {
      let check = [];
      this.cart.forEach((itemCart) => {
        if (
          itemCart.id == item.id &&
          itemCart.variant_id == item.variant_id &&
          itemCart.option_id == item.option_id &&
          itemCart.discount_id == item.discount_id &&
          itemCart.sales_type_id == item.sales_type_id
        ) {
          // itemCart.quantity += +item.quantity;
          check.push(true);
          this.showModalInfo(
            "Silahkan Edit item yang ada di cart untuk menambahkan Quantity item yang sama"
          );
        } else {
          check.push(false);
        }
      });

      if (!check.includes(true)) {
        item.hideOptions = true;
        this.cart.unshift(item);
      }
    },

    saveEditItem(item, index) {
      this.cart[index] = item;
    },

    async fetchItems() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.get(apiHost + "/api/store/items", {
          headers,
        });
        this.items = response.data.data;
        this.searchResult = response.data.data;
      } catch (error) {
        this.checkToken(error.response.status);
      }
    },

    async fetchDiscounts() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/store/discounts", {
        headers,
      });
      this.discounts = response.data.data;
    },

    async fetchCategories() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/store/categories", {
        headers,
      });
      this.categories = response.data.data;
    },

    checkToken(error) {
      if (error == 401) {
        alert("Sesi Anda Telah Berakhir, Silahkan Login Ulang");
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },

    selectItemsFromSavedOrders(items) {
      this.cart = items;
    },
  },

  mounted() {
    this.fetchItems();
    this.fetchCategories();
    this.fetchDiscounts();
  },
};
</script>
