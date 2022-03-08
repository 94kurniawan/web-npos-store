<template>
  <div
    @click="closeModalWindow()"
    class="
      hidden
      fixed
      inset-0
      bg-gray-600 bg-opacity-50
      overflow-y-auto
      h-full
      w-full
    "
    id="pay-order"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-20
        border
        w-4/6
        h-auto
        pb-10
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="flex justify-between py-3 shadow-md sticky top-0 bg-white">
        <p class="px-4 my-auto">Total : {{ currency(totalPay) }}</p>
        <div class="px-4">
          <button
            @click="pay()"
            class="bg-modern-green text-white py-3 px-6 rounded-md"
          >
            BAYAR
          </button>
        </div>
      </div>

      <div class="px-4 py-2 flex gap-4 items-center">
        <p class="text-sm text-gray-500 flex-none">Jumlah Uang</p>
        <currency-input
          v-if="payment.type.name == 'Cash'"
          v-model="payment.received"
          onfocus="this.select();"
          :options="{
            currency: 'IDR',
            hideGroupingSeparatorOnFocus: false,
            currencyDisplay: 'narrowSymbol',
            autoDecimalDigits: false,
          }"
          class="
            disabled
            text-base
            w-full
            p-4
            rounded-md
            border border-gray-400
            focus:outline-none focus:border-green-700
            text-right
          "
        />
        <currency-input
          v-if="payment.type.name != 'Cash'"
          v-model="payment.received"
          :options="{
            currency: 'IDR',
            hideGroupingSeparatorOnFocus: false,
            currencyDisplay: 'narrowSymbol',
          }"
          disabled
          class="
            disabled
            text-base
            w-full
            p-4
            rounded-md
            border border-gray-400
            bg-gray-200
            focus:outline-none focus:border-green-700
            text-right
          "
        />
      </div>

      <div class="px-4 flex justify-end">
        <p
          class="text-sm text-gray-500 bg-yellow-300 p-2 bg-opacity-40 rounded"
        >
          {{ change }}
        </p>
      </div>

      <div class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Payment Type</p>
        <div class="grid grid-cols-2 gap-2 overflow-x-auto">
          <div
            class=""
            v-for="paymentType in paymentTypes"
            :key="paymentType.key"
          >
            <div
              @click="checkedPaymentType(paymentType.id, paymentType)"
              class="border-2 p-4 bg-gray-50 rounded-md active:bg-gray-200"
            >
              <input
                type="radio"
                name="paymentTypes"
                :value="paymentType.id"
                v-model="payment.type_id"
              />
              <label class="ml-1"> {{ paymentType.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrencyInput from "@/views/components/CurrencyInput.vue";
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "PayOrder",
  components: {
    CurrencyInput,
  },
  props: {
    totalPay: Number,
    paymentTypes: Array,
  },

  data() {
    return {
      payment: {
        type: {},
        type_id: null,
        received: null,
      },
    };
  },

  watch: {
    paymentTypes: function (newVal, oldVal) {
      newVal.forEach((type) => {
        let name = type.name.toUpperCase();
        if (name == "CASH") {
          this.payment.type_id = type.id;
          this.payment.type = type;
        }
      });
    },
    totalPay: function (newVal, oldVal) {
      this.payment.received = newVal;
    },
  },

  computed: {
    change() {
      let change = this.payment.received - this.totalPay || 0;
      if (change < 0) {
        return "Jumlah Uang Kurang !!";
      } else if (change == 0) {
        return "-";
      } else {
        return "Kembalian -> " + this.currency(change);
      }
    },
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    resetPayment() {
      this.paymentTypes.forEach((type) => {
        let name = type.name.toUpperCase();
        if (name == "CASH") {
          this.payment.type_id = type.id;
          this.payment.type = type;
          this.payment.received = this.totalPay;
        }
      });
      // this.payment = {
      //   type: {},
      //   type_id: 1,
      //   received: this.totalPay,
      // };
    },
    closeModalWindow() {
      let modal = document.getElementById("pay-order");
      if (window.event.target == modal) {
        modal.style.display = "none";
        this.resetPayment();
      }
    },
    checkedPaymentType(id, paymentType) {
      this.payment.type_id = id;
      this.payment.type = paymentType;
      this.payment.received = this.totalPay;
      // if (id != 1) {
      //   this.payment.received = this.totalPay;
      // }
    },
    pay() {
      this.$emit("pay", this.payment);
      this.resetPayment();
    },
  },
};
</script>