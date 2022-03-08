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
    id="edit-item"
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
            @click="saveItem()"
            class="bg-modern-green text-white py-3 px-6 rounded-md"
          >
            SAVE
          </button>
        </div>
      </div>
      <div v-if="item.variant_id != null" class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">
          Variants
          <i class="ml-1 bg-gray-300 text-white py-0.5 px-2 rounded-r-lg"
            >pilih salah satu</i
          >
        </p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="variant in optionsList.variants"
            :key="variant.key"
            @click="checkedVariant(variant.id, variant)"
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
              type="radio"
              name="editVariants"
              :value="variant.id"
              v-model="item.variant_id"
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
            v-model="item.quantity"
            class="
              flex-none
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
      <div v-if="item.option_id != null" class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Options</p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="option in optionsList.options"
            :key="option.key"
            @click="checkedOption(option.id, option)"
            class="border-2 p-4 bg-gray-50 rounded-md active:bg-gray-200"
          >
            <input
              type="radio"
              name="editOptions"
              :value="option.id"
              v-model="item.option_id"
            />
            <label class="ml-1"> {{ option.name }}</label>
          </div>
        </div>
      </div>
      <div v-if="item.discount_id != null" class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Discount</p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="discount in discounts"
            :key="discount.key"
            @click="checkedDiscount(discount.id, discount)"
            class="border-2 p-4 bg-gray-50 rounded-md active:bg-gray-200"
          >
            <input
              type="radio"
              name="editDiscounts"
              :value="discount.id"
              v-model="item.discount_id"
            />
            <label class="ml-1"> {{ discount.name }}</label>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Sales Type</p>
        <div class="grid grid-flow-row grid-cols-3 gap-3">
          <div
            v-for="salesType in optionsList.sales_types"
            :key="salesType.key"
            @click="checkedSalesType(salesType.id, salesType)"
            class="border-2 p-4 bg-gray-50 rounded-md active:bg-gray-200"
          >
            <input
              type="radio"
              name="editSalesType"
              :value="salesType.id"
              v-model="item.sales_type_id"
            />
            <label class="ml-1">
              {{ salesType.name }}
              <div
                class="space-y-1"
                v-if="salesType.additional_cost.length > 0"
              >
                <div
                  v-for="cost in item.additional_cost"
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
          v-model="item.note"
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
  name: "EditItemOptions",
  components: {},
  props: ["item", "items", "discounts"],

  computed: {
    optionsList() {
      let obj = {};
      let x = this.items.filter((item) => {
        return parseInt(item.id) === parseInt(this.item.id);
      });
      obj = x[0];
      return obj || {};
    },

    // totalPrice2() {
    //   if (+this.item.sub_total >= 0) {
    //     let option = this.item.quantity * this.item.option.price || 0;
    //     let total = this.item.quantity * this.item.price + option;
    //     let discount = total * this.item.discount.percentage || 0;
    //     this.item.sub_total = total - discount;
    //     // this.temporary = this.item;
    //     return this.item.sub_total;
    //   } else {
    //     return 0;
    //   }
    // },

    totalPrice() {
      let price = this.item.sales_type.price || 0;
      let total = this.item.quantity * price || 0;
      let discount = +this.item.discount.percentage || 0;
      let totalAfterDiscount = total - total * discount;
      let result = totalAfterDiscount;
      this.item.sub_total = result;
      return result;
    },
    additionalCost() {
      let total = [];
      if (this.item.sales_type.additional_cost.length > 0) {
        this.item.sales_type.additional_cost.forEach((cost) => {
          let value = {};
          value.name = cost.name;
          value.total = cost.percentage * this.totalPrice || 0;
          total.push(value);
        });
      }
      this.item.additional_cost = total;
      return total;
    },

    subTotal() {
      let total = 0;
      let totalAdditionalCost = 0;
      this.additionalCost.forEach((cost) => {
        totalAdditionalCost += cost.total;
      });
      total = totalAdditionalCost + this.totalPrice;
      this.item.sub_total = total;
      this.item.total_additional_cost = totalAdditionalCost;
      return total;
    },
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    closeModal() {
      let modal = document.getElementById("edit-item");
      modal.style.display = "none";
      // if (window.event.target == modal) {
      // }
    },
    plusQty() {
      this.item.quantity += 1;
    },
    minusQty() {
      this.item.quantity -= 1;
    },

    checkedVariant(id, variant) {
      this.item.variant_id = id;
      this.item.variant = variant;
    },
    checkedOption(id, option) {
      this.item.option_id = id;
      this.item.option = option;
    },
    checkedDiscount(id, discount) {
      if (this.item.discount_id == id) {
        this.item.discount_id = null;
        this.item.discount = {};
      } else {
        this.item.discount_id = id;
        this.item.discount = discount;
      }
    },
    checkedSalesType(id, salesType) {
      this.item.sales_type_id = id;
      this.item.sales_type = salesType;
      this.item.price = this.item.sales_type.price;
    },

    saveItem() {
      this.$emit("save-item");
      this.item.hideOptions = true;
      this.closeModal();
      // this.temporary = {};
    },
  },
};
</script>