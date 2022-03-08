<template>
  <div
    class="
      hidden
      fixed
      inset-0
      bg-gray-600 bg-opacity-50
      overflow-y-auto
      h-full
      w-full
    "
    id="my-modal"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-14
        border
        w-5/6
        h-5/6
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <!-- <div class="mt-3 text-center">
        <div
          class="
            mx-auto
            flex
            items-center
            justify-center
            h-12
            w-12
            rounded-full
            bg-green-100
          "
        >
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Successful!</h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            Account has been successfully registered!
          </p>
        </div>
        <div class="items-center px-4 py-3">
          <button
            id="save-btn"
            class="
              px-4
              py-2
              bg-green-500
              text-white text-base
              font-medium
              rounded-md
              w-full
              shadow-sm
              hover:bg-green-600
              focus:outline-none focus:ring-2 focus:ring-green-300
            "
          >
            OK
          </button>
        </div>
      </div> -->

      <div class="flex justify-between py-3 shadow-md sticky top-0 bg-white">
        <div class="px-4">
          <button
            @click="closeModal()"
            class="bg-gray-500 text-white py-3 px-6 rounded-md"
          >
            CANCEL
          </button>
        </div>
        <p class="px-4 my-auto">
          <i class="uppercase not-italic">{{ item.name }}</i> ({{
            currency(subTotal)
          }})
        </p>
        <div class="px-4">
          <button
            @click="checkNull()"
            class="bg-modern-green text-white py-3 px-6 rounded-md"
          >
            SAVE
          </button>
        </div>
      </div>
      <div v-if="item.variants.length > 0" class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">
          Variants
          <i class="ml-1 bg-gray-300 text-white py-0.5 px-2 rounded-r-lg"
            >pilih salah satu</i
          >
        </p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="variant in item.variants"
            :key="variant.key"
            @click="checkedVariant('variant' + variant.id, variant)"
            class="
              border-2
              p-4
              align-middle
              bg-gray-50
              rounded-md
              active:bg-gray-200
            "
          >
            <input
              @click="checkedVariant('variant' + variant.id, variant)"
              type="radio"
              name="variants"
              :id="'variant' + variant.id"
            />
            <label class="ml-1"> {{ variant.name }}</label>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Quantity</p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <button
            @click="minusQty()"
            type="button"
            class="
              outline-none
              w-full
              border-2
              bg-gray-50
              active:bg-gray-200
              py-3
              px-6
              rounded-md
              flex
              justify-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <input
            v-model="temporary.quantity"
            class="
              text-base text-center
              px-4
              py-2
              rounded-md
              border border-gray-400
              focus:outline-none focus:border-green-700
            "
            type="number"
          />
          <button
            @click="plusQty()"
            type="button"
            class="
              outline-none
              w-full
              border-2
              bg-gray-50
              active:bg-gray-200
              py-3
              px-6
              rounded-md
              flex
              justify-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="item.options.length > 0" class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Options</p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="option in item.options"
            :key="option.key"
            @click="checkedOption('option' + option.id, option)"
            class="border-2 p-4 bg-gray-50 rounded-md active:bg-gray-200"
          >
            <input
              @click="checkedOption('option' + option.id, option)"
              type="radio"
              name="options"
              :id="'option' + option.id"
            />
            <label class="ml-1"> {{ option.name }}</label>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Discount</p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="discount in discounts"
            :key="discount.key"
            @click="checkedDiscount('discount' + discount.id, discount)"
            class="border-2 p-4 bg-gray-50 rounded-md active:bg-gray-200"
          >
            <input
              @click="checkedDiscount('discount' + discount.id, discount)"
              type="radio"
              name="discounts"
              :id="'discount' + discount.id"
            />
            <label class="ml-1"> {{ discount.name }}</label>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Sales Type</p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="salesType in item.sales_types"
            :key="salesType.key"
            @click="checkedSalesType('salesType' + salesType.id, salesType)"
            class="
              border-2
              flex-none
              p-4
              bg-gray-50
              rounded-md
              active:bg-gray-200
            "
          >
            <input
              @click="checkedSalesType('salesType' + salesType.id, salesType)"
              type="radio"
              name="salesType"
              :id="'salesType' + salesType.id"
            />
            <label class="ml-1">
              {{ salesType.name }}
              <div
                class="space-y-1"
                v-if="salesType.additional_cost.length > 0"
              >
                <div
                  v-for="cost in temporary.additional_cost"
                  :key="cost.key"
                  class="ml-4 flex"
                >
                  <p class="bg-gray-200 px-3 rounded">
                    + {{ cost.name }} ({{ currency(cost.total) }})
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Note</p>
        <textarea
          v-model="temporary.note"
          placeholder="keterangan tambahan...."
          class="
            w-full
            text-base text-left
            px-4
            py-2
            rounded-md
            border border-gray-400
            focus:outline-none focus:border-green-700
          "
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "ModalItemOptions",
  components: {},
  props: ["item", "discounts"],

  data() {
    return {
      temporary: {
        name: "",
        variant: {}, //
        variant_id: null,
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
        note: "",
      },
    };
  },

  computed: {
    totalPrice() {
      let total =
        this.temporary.quantity * this.temporary.sales_type.price || 0;
      let discount = +this.temporary.discount.percentage || 0;
      let totalAfterDiscount = total - total * discount;

      let result = totalAfterDiscount;
      return result;
    },
    additionalCost() {
      let total = [];
      if (this.temporary.sales_type.additional_cost.length > 0) {
        this.temporary.sales_type.additional_cost.forEach((cost) => {
          let value = {};
          value.name = cost.name;
          value.total = cost.percentage * this.totalPrice || 0;
          total.push(value);
        });
      }
      this.temporary.additional_cost = total;
      return total;
    },
    subTotal() {
      let total = 0;
      let totalAdditionalCost = 0;
      this.additionalCost.forEach((cost) => {
        totalAdditionalCost += cost.total;
      });
      total = totalAdditionalCost + this.totalPrice;
      this.temporary.sub_total = total;
      this.temporary.total_additional_cost = totalAdditionalCost;
      return total;
    },
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    uncheck() {
      if (this.temporary.variant.id) {
        document.getElementById(
          "variant" + this.temporary.variant.id
        ).checked = false;
      }
      if (this.temporary.option.id) {
        document.getElementById(
          "option" + this.temporary.option.id
        ).checked = false;
      }
      if (this.temporary.discount.id) {
        document.getElementById(
          "discount" + this.temporary.discount.id
        ).checked = false;
      }
      if (this.temporary.sales_type.id) {
        document.getElementById(
          "salesType" + this.temporary.sales_type.id
        ).checked = false;
      }
    },
    resetTemporary() {
      this.uncheck();
      this.temporary = {
        name: "",
        variant: {}, //
        variant_id: null,
        option: {}, //
        option_id: null,
        discount: {}, //
        discount_id: null,
        quantity: 1, //
        sales_type: {
          additional_cost: [],
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
        note: "",
      };
    },
    closeModal() {
      let modal = document.getElementById("my-modal");
      modal.style.display = "none";
      this.resetTemporary();
    },
    plusQty() {
      this.temporary.quantity += 1;
    },
    minusQty() {
      this.temporary.quantity -= 1;
    },
    checkedVariant(id, variant) {
      if (document.getElementById(id).checked) {
        document.getElementById(id).checked = false;
        this.temporary.variant = {};
      } else {
        document.getElementById(id).checked = true;
        this.temporary.variant = variant;
      }
    },
    checkedOption(id, option) {
      if (document.getElementById(id).checked) {
        document.getElementById(id).checked = false;
        this.temporary.option = {};
      } else {
        document.getElementById(id).checked = true;
        this.temporary.option = option;
      }
    },
    checkedDiscount(id, discount) {
      if (document.getElementById(id).checked) {
        document.getElementById(id).checked = false;
        this.temporary.discount = {};
      } else {
        document.getElementById(id).checked = true;
        this.temporary.discount = discount;
      }
    },
    checkedSalesType(id, salesType) {
      if (document.getElementById(id).checked) {
        document.getElementById(id).checked = false;
        this.temporary.sales_type = {
          additional_cost: [
            {
              name: "",
            },
          ],
        };
      } else {
        document.getElementById(id).checked = true;
        this.temporary.sales_type = salesType;
      }
    },
    // jika item memiliki varian maka temporary varian wajib diisi
    // sales type wajib diisi
    checkNull() {
      if (this.temporary.sales_type.id) {
        if (this.item.variants.length === 0) {
          this.saveData();
        } else if (this.temporary.variant.id) {
          this.saveData();
        } else {
          alert("pilih variant untuk melanjutkan");
        }
      } else {
        alert("Pilih Sales Type untuk Melanjutkan");
      }
    },
    saveData() {
      this.temporary.name = this.item.name;
      this.temporary.id = this.item.id;
      this.temporary.price = this.temporary.sales_type.price;
      this.temporary.sales_type_id = this.temporary.sales_type.id;
      this.temporary.discount_id = this.temporary.discount.id || null;
      this.temporary.option_id = this.temporary.option.id || null;
      this.temporary.variant_id = this.temporary.variant.id || null;
      this.$emit("save-item", this.temporary);
      let modal = document.getElementById("my-modal");
      modal.style.display = "none";
      this.resetTemporary();
    },
  },

  mounted() {},
};
</script>