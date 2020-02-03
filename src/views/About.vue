<template>
  <div class="container">
    <v-row align="center">
      <v-row justify="space-around">
        <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
        <v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch>
      </v-row>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field v-model="task.title" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

        <v-text-field v-model="task.description" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addTask">Validate</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

        <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
      </v-form>
    </v-row>
  </div>
</template>

<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}
export default {
  data: () => ({
    task: new Task(),
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    lazy: false
  }),

  methods: {
    addTask() {
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(this.task),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => console.log(data));
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
<style>
</style>
