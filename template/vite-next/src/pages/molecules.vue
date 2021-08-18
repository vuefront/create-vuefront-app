<template>
  <vf-m-container class="mx-auto mb-8">
    <vf-a-heading class="text-center mt-4"> EDIT STATE </vf-a-heading>
    <div class="text-center my-8">
      <vf-a-button color="danger" @click="state = !state"> Change </vf-a-button>
    </div>
    <vf-a-heading class="text-center mt-4"> DROPDOWN </vf-a-heading>
    <div class="text-center my-8">
      <vf-m-dropdown>
        <template v-slot:button-content>
          <vf-a-icon :icon="mdiAccountOutline" />
          Label
        </template>
        <vf-m-dropdown-item>Item 1</vf-m-dropdown-item>
        <vf-m-dropdown-item>Item 2</vf-m-dropdown-item>
        <vf-m-dropdown-item>Item 3</vf-m-dropdown-item>
      </vf-m-dropdown>
      <vf-m-dropdown variant="link" right>
        <template v-slot:button-content>
          <vf-a-icon :icon="mdiAccountOutline" />
          Label
        </template>
        <vf-m-dropdown-item>Item 1</vf-m-dropdown-item>
        <vf-m-dropdown-item>Item 2</vf-m-dropdown-item>
        <vf-m-dropdown-item>Item 3</vf-m-dropdown-item>
      </vf-m-dropdown>
    </div>
    <vf-a-heading class="text-center mt-4"> INPUT GROUP </vf-a-heading>
    <div class="text-center my-8">
      <vf-m-input-group
        v-for="size in ['sm', '', 'lg']"
        :key="size"
        :size="size"
        class="mb-3"
        prepend="Label"
      >
        <vf-a-input />
        <template #append>
          <vf-a-button size="sm" text="Button" variant="success">
            Button
          </vf-a-button>
        </template>
      </vf-m-input-group>
    </div>
    <div class="text-center my-8">
      <vf-m-input-group>
        <template #prepend>
          <vf-m-dropdown text="Dropdown" variant="info">
            <vf-m-dropdown-item>Action A</vf-m-dropdown-item>
            <vf-m-dropdown-item>Action B</vf-m-dropdown-item>
          </vf-m-dropdown>
        </template>

        <vf-a-input />

        <template #append>
          <vf-m-dropdown
            v-for="i in 2"
            :key="i"
            text="Dropdown"
            variant="outline-secondary"
          >
            <vf-m-dropdown-item>Action C</vf-m-dropdown-item>
            <vf-m-dropdown-item>Action D</vf-m-dropdown-item>
          </vf-m-dropdown>
        </template>
      </vf-m-input-group>
    </div>
    <vf-a-heading class="text-center mt-4"> BUTTON GROUP </vf-a-heading>
    <div class="text-center my-8">
      <vf-m-button-group size="sm">
        <vf-a-button>Left</vf-a-button>
        <vf-a-button>Middle</vf-a-button>
        <vf-a-button>Right</vf-a-button>
      </vf-m-button-group>
    </div>
    <div class="text-center my-8">
      <vf-m-button-group>
        <vf-a-button>Left</vf-a-button>
        <vf-a-button>Middle</vf-a-button>
        <vf-a-button>Right</vf-a-button>
      </vf-m-button-group>
    </div>
    <div class="text-center my-8">
      <vf-m-button-group size="lg">
        <vf-a-button>Left</vf-a-button>
        <vf-a-button>Middle</vf-a-button>
        <vf-a-button>Right</vf-a-button>
      </vf-m-button-group>
    </div>
    <vf-a-heading class="text-center mt-4"> LIST GROUP </vf-a-heading>
    <div class="text-center my-8">
      <vf-m-list-group>
        <vf-m-list-group-item active to="#">
          List item one
        </vf-m-list-group-item>
        <vf-m-list-group-item to="#"> List item two </vf-m-list-group-item>
        <vf-m-list-group-item to="#"> List item tree </vf-m-list-group-item>
      </vf-m-list-group>
    </div>
    <vf-a-heading class="text-center mt-4"> MEDIA </vf-a-heading>
    <div class="my-8">
      <vf-m-card>
        <vf-m-card-body>
          <vf-m-media>
            <template #aside>
              <vf-a-image blank-color="#ccc" width="64" alt="placeholder" />
            </template>

            <vf-a-heading level="5" class="mt-0"> Media Title </vf-a-heading>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin. Cras purus odio, vestibulum in
              vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
            <p>
              Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel
              eu leo. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus.
            </p>

            <vf-m-media>
              <template #aside>
                <vf-a-image
                  blank-color="#ccc"
                  width="64"
                  heigth="64px"
                  alt="placeholder"
                />
              </template>

              <vf-a-heading level="5" class="mt-0"> Nested Media </vf-a-heading>
              <p class="mb-0">
                Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                lacinia congue felis in faucibus.
              </p>
            </vf-m-media>
          </vf-m-media>
        </vf-m-card-body>
      </vf-m-card>
    </div>
    <div class="my-8">
      <vf-m-media right-align vertical-align="center">
        <template #aside>
          <vf-a-image blank blank-color="#ccc" width="80" alt="placeholder" />
        </template>
        <h5 class="mt-0 mb-1">Media object</h5>
        <p class="mb-0">
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
      </vf-m-media>
    </div>
    <vf-a-heading class="text-center mt-4"> TABLE </vf-a-heading>
    <vf-m-table striped hover :fields="fields" :items="items" />
    <vf-a-heading class="text-center mt-4"> TABLE HORIZONTAL </vf-a-heading>
    <vf-m-table-horizontal striped hover :fields="fields" :items="items" />
  </vf-m-container>
</template>
<script>
import { mdiAccountOutline } from "@mdi/js";
export default {
  data() {
    return {
      mdiAccountOutline,
      checkbox1: false,
      radio1: false,
      radioGroup1: "A",
      checkboxGroup1: [],
      select: null,
      page: 2,
      state: true,
      fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "image",
          label: "Image",
        },
        {
          key: "price",
          label: "Price",
        },
        {
          key: "model",
          label: "Model",
        },
        {
          key: "stock",
          label: "Stock",
        },
        {
          key: "shortDescription",
          label: "Description",
        },
      ],
      items: [
        {
          id: "48",
          name: "iPod Classic",
          shortDescription:
            "More room to move.\r\n\t\t\r\n\t\t\tWith 80GB or 160GB of storage and up to 40 hours of battery life, the new..",
          model: "product 20",
          price: "95.72\u20AC",
          special: "",
          stock: true,
          image:
            "https://opencart.vuefront.com/image/cache/catalog/demo/ipod_classic_1-228x228.jpg",
          imageLazy:
            "https://opencart.vuefront.com/image/cache/catalog/demo/ipod_classic_1-10x10.jpg",
          __typename: "Product",
        },
        {
          id: "47",
          name: "HP LP3065",
          shortDescription:
            "Stop your co-workers in their tracks with the stunning new 30-inch diagonal HP LP3065 Flat Panel Mon..",
          model: "Product 21",
          price: "95.72\u20AC",
          special: "",
          stock: true,
          image:
            "https://opencart.vuefront.com/image/cache/catalog/demo/hp_1-228x228.jpg",
          imageLazy:
            "https://opencart.vuefront.com/image/cache/catalog/demo/hp_1-10x10.jpg",
          __typename: "Product",
        },
      ],
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
      colors: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "white",
        "light",
        "dark",
      ],
    };
  },
};
</script>
