<template>
  <div class="h-screen w-screen p-6 bg-gray-100 overflow-y-auto">
    <div
      class="
        p-6
        relative
        mx-auto
        md:w-1/2
        lg:w-1/3
        bg-white
        shadow-lg
        rounded-t-xl
      "
    >
      <!-- <div class="relative px-6">
        <img src="@/assets/img/NullReborn.png" class="mx-auto h-60" />
        <div class="absolute bottom-0 left-0 p-3 w-full bg-gray-100"></div>
      </div> -->
      <!-- <p class="text-center p-1 bg-gray-200 tracking-widest text-xl">
        Development Mode
      </p> -->
      <p class="text-center p-5 tracking-widest text-xl">WELCOME BACK</p>
      <div class="flex items-center content-center mt-0 px-6">
        <div class="absolute text-gray-600">
          <svg
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
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
        <input
          @keyup.enter="login()"
          v-model="data.username"
          type="email"
          name=""
          class="w-full bg-white py-4 pl-8 outline-none rounded-t-md border-b-2"
          placeholder="Email"
        />
      </div>
      <div class="flex items-center content-center mt-1 px-6">
        <div class="absolute text-gray-600">
          <svg
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
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <input
          @keyup.enter="login()"
          v-model="data.password"
          type="password"
          name=""
          class="w-full bg-white py-4 pl-8 outline-none rounded-b-md"
          placeholder="Password"
        />
      </div>
      <div class="mt-4 px-6">
        <button
          @click="login()"
          class="
            border
            p-4
            w-full
            bg-modern-green
            tracking-widest
            text-white
            uppercase
          "
        >
          Login
        </button>
      </div>
      <div class="py-5">
        <p class="text-center">. . .</p>
        <p class="text-center text-gray-500 text-sm">
          Untuk menjaga keamanan dan kerahasiaan data pastikan mengatur
          user/pengguna dengan bijak sesuai role/aturan yang berlaku ditempat
          anda
        </p>
        <p class="text-center">. . .</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Login",
  data() {
    return {
      data: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      const response = await axios.post(apiHost + "/api/login", this.data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      this.$router.push("/home");
    },

    checkToken() {
      if (localStorage.getItem("token")) {
        this.$router.push("/home");
      }
    },
  },

  mounted() {
    this.checkToken();
  },
};
</script>
