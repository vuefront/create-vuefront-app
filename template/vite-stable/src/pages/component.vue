<template>
  <vf-m-container class="mx-auto mb-8">
    <vf-a-link to="/">Back to home page</vf-a-link>
    <vf-a-heading class="text-center mt-4"> EDIT STATE </vf-a-heading>
    <div class="text-center my-8">
      <vf-a-button color="danger" @click="state = !state"> Change </vf-a-button>
    </div>
    <vf-a-heading class="text-center mt-4"> BUTTON </vf-a-heading>
    <div class="text-center my-8">
      <vf-a-button v-for="(value, index) in colors" :key="index" :color="index">
        {{ index }}
      </vf-a-button>
    </div>
    <div class="text-center my-8">
      <vf-a-button size="sm"> Small Button </vf-a-button>
      <vf-a-button>Default Button</vf-a-button>
      <vf-a-button size="lg"> Large Button </vf-a-button>
    </div>
    <div class="text-center my-8">
      <vf-a-button
        v-for="(value, index) in colors"
        :key="index"
        :color="index"
        rounded
      >
        {{ index }}
      </vf-a-button>
    </div>
    <div class="text-center my-8">
      <vf-a-button disabled size="lg" color="primary"> Disabled </vf-a-button>
      <vf-a-button disabled size="lg"> Also Disabled </vf-a-button>
    </div>
    <div class="text-center my-8">
      <vf-a-button
        v-for="(value, index) in colors"
        :key="index"
        :color="index"
        rounded
        outline
      >
        {{ index }}
      </vf-a-button>
    </div>
    <div class="text-center my-8">
      <vf-a-button animated-y>
        <template #hidden> Hidden </template>
        <template #visible> visible </template>
      </vf-a-button>
    </div>
    <div class="text-center my-8">
      <vf-a-button animated-x>
        <template #hidden> Hidden </template>
        <template #visible> visible </template>
      </vf-a-button>
    </div>
    <vf-a-heading class="text-center mt-4"> ALERT </vf-a-heading>
    <div class="text-center my-8">
      <vf-a-alert
        v-for="(value, index) in colors"
        :key="index"
        :color="index"
        :show="true"
        dismissible
      >
        {{ index }}
      </vf-a-alert>
    </div>
    <vf-a-heading class="text-center mt-4"> BADGE </vf-a-heading>
    <div class="text-center my-8">
      <vf-a-badge v-for="(value, index) in colors" :key="index" :color="index">
        {{ index }}
      </vf-a-badge>
    </div>
    <div class="text-center my-8">
      <vf-a-badge
        v-for="(value, index) in colors"
        :key="index"
        :color="index"
        rounded
      >
        {{ index }}
      </vf-a-badge>
    </div>
    <vf-a-heading class="text-center mt-4"> CHECKBOX </vf-a-heading>
    <div>
      <vf-a-checkbox
        id="checkbox-1"
        v-model="checkbox1"
        :state="state"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        I accept the terms and use
      </vf-a-checkbox>

      <div>
        State: <strong>{{ checkbox1 }}</strong>
      </div>
    </div>
    <vf-a-heading class="text-center mt-4"> CHECKBOX GROUP </vf-a-heading>
    <div>
      <vf-a-checkbox-group
        v-model="checkboxGroup1"
        :options="options"
        class="mb-3"
        :state="state"
        value-field="item"
        text-field="name"
      />
      <vf-a-checkbox-group
        v-model="checkboxGroup1"
        :options="options"
        class="mb-3"
        :state="state"
        value-field="item"
        text-field="name"
        stacked
      />
      <div class="mt-3">
        Selected: <strong>{{ checkboxGroup1 }}</strong>
      </div>
    </div>
    <vf-a-heading class="text-center mt-4"> DATEPICKER </vf-a-heading>
    <div class="text-center">
      <vf-a-datepicker :state="state" />
    </div>
    <vf-a-heading class="text-center mt-4"> INPUT </vf-a-heading>
    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-small">Small:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-input
          id="input-small"
          :state="state"
          size="sm"
          placeholder="Enter your name"
        />
      </vf-m-col>
    </vf-m-row>
    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-default">Default:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-input
          id="input-default"
          :state="state"
          placeholder="Enter your name"
        />
      </vf-m-col>
    </vf-m-row>

    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-large">Large:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-input
          id="input-large"
          :state="state"
          size="lg"
          placeholder="Enter your name"
        />
      </vf-m-col>
    </vf-m-row>
    <vf-a-heading class="text-center mt-4"> HEADING </vf-a-heading>
    <vf-a-heading level="1"> h1. Bootstrap heading </vf-a-heading>
    <vf-a-heading level="2"> h2. Bootstrap heading </vf-a-heading>
    <vf-a-heading level="3"> h3. Bootstrap heading </vf-a-heading>
    <vf-a-heading level="4"> h4. Bootstrap heading </vf-a-heading>
    <vf-a-heading level="5"> h5. Bootstrap heading </vf-a-heading>
    <vf-a-heading level="6"> h6. Bootstrap heading </vf-a-heading>
    <vf-a-heading class="text-center mt-4"> PAGINATION </vf-a-heading>
    <div class="text-center mb-5">
      <vf-a-pagination v-model="page" :total-pages="50" :per-page="10" />
    </div>
    <div class="mt-3 text-center">
      Page: <strong>{{ page }}</strong>
    </div>
    <vf-a-heading class="text-center mt-4"> RADIO </vf-a-heading>
    <div>
      <vf-a-radio
        id="radio-1"
        v-model="radio1"
        :state="state"
        name="radio-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        I accept the terms and use
      </vf-a-radio>

      <div>
        State: <strong>{{ radio1 }}</strong>
      </div>
      <vf-a-heading class="text-center mt-4"> RADIO GROUP </vf-a-heading>
      <div>
        <vf-a-radio-group
          v-model="radioGroup1"
          :options="options"
          class="mb-3"
          value-field="item"
          :state="state"
          text-field="name"
        />
        <vf-a-radio-group
          v-model="radioGroup1"
          :options="options"
          class="mb-3"
          :state="state"
          value-field="item"
          text-field="name"
          stacked
        />
        <div class="mt-3">
          Selected: <strong>{{ radioGroup1 }}</strong>
        </div>
      </div>
    </div>
    <vf-a-heading class="text-center mt-4"> SELECT </vf-a-heading>
    <div>
      <vf-a-select v-model="select" :state="state" :options="options2" />
      <vf-a-select
        v-model="select"
        :state="state"
        :options="options2"
        size="sm"
        class="mt-3"
      />
      <div class="mt-3">
        Selected: <strong>{{ select }}</strong>
      </div>
    </div>
    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-small">Small:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-select
          id="input-small"
          v-model="select"
          :state="state"
          size="sm"
          :options="options2"
        />
      </vf-m-col>
    </vf-m-row>
    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-default">Default:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-select
          id="input-default"
          v-model="select"
          :state="state"
          :options="options2"
        />
      </vf-m-col>
    </vf-m-row>
    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-large">Large:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-select
          id="input-large"
          v-model="select"
          :state="state"
          size="lg"
          :options="options2"
        />
      </vf-m-col>
    </vf-m-row>
    <vf-a-heading class="text-center mt-4"> TEXTAREA </vf-a-heading>
    <vf-a-textarea
      id="textarea-state"
      placeholder="Enter at least 10 characters"
      rows="3"
    />
    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-small">Small:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-textarea
          id="input-small"
          :state="state"
          size="sm"
          placeholder="Enter your name"
        />
      </vf-m-col>
    </vf-m-row>
    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-default">Default:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-textarea
          id="input-default"
          :state="state"
          placeholder="Enter your name"
        />
      </vf-m-col>
    </vf-m-row>

    <vf-m-row class="my-1">
      <vf-m-col xs="2">
        <label for="input-large">Large:</label>
      </vf-m-col>
      <vf-m-col xs="10">
        <vf-a-textarea
          id="input-large"
          :state="state"
          size="lg"
          placeholder="Enter your name"
        />
      </vf-m-col>
    </vf-m-row>
    <vf-a-heading class="text-center mt-4"> TIMEPICKER </vf-a-heading>
    <div class="text-center">
      <vf-a-timepicker />
    </div>
  </vf-m-container>
</template>
<script>
export default {
  data() {
    return {
      colors: {
        primary: "#6e00ff",
        secondary: "#eff2f7",
        success: "#36b37e",
        info: "#00b8d9",
        warning: "#ffab00",
        danger: "#ff5630",
        white: "#ffffff",
        light: "#eff2f7",
        dark: "#273444",
      },
      checkbox1: false,
      radio1: false,
      radioGroup1: "A",
      checkboxGroup1: [],
      select: null,
      page: 2,
      state: true,
      options2: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
      options: [
        { item: "A", name: "Option A" },
        { item: "B", name: "Option B" },
        { item: "D", name: "Option C", notEnabled: true },
        { item: { d: 1 }, name: "Option D" },
      ],
      // colors: [
      //   'primary',
      //   'secondary',
      //   'success',
      //   'info',
      //   'warning',
      //   'danger',
      //   'white',
      //   'light',
      //   'dark'
      // ]
    };
  },
};
</script>
