<template>
  <div class="main">
    <nav class="navbar navbar-light bg-light" v-if="loading">
      <a class="navbar-brand">jsDelivr</a>
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="searchString"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>

    <div class="table-responsive" v-if="loading">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="d-none d-md-block">#</th>
            <th
              scope="col"
              v-for="(head, idx) in Object.keys(packages[0])"
              :key="idx"
            >
              {{ head }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(items, index) in outputPackages"
            :key="index"
            @click.prevent="openDetails(items)"
          >
            <td scope="row" class="d-none d-md-block">
              {{ currentPage + index + 1 }}
            </td>
            <td v-for="(item, ind) in items" :key="ind">{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav v-if="loading">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 0 }">
          <div class="page-link" @click="prevPage">Previous</div>
        </li>
        <li
          class="page-item d-none d-md-block"
          :class="{ active: currentPage === (page - 1) * countPage }"
          v-for="page in pages"
          :key="page"
          @click="openPage(page)"
        >
          <div class="page-link">{{ page }}</div>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage >= packages.length - countPage }"
        >
          <div class="page-link" @click="nextPage">Next</div>
        </li>
      </ul>
    </nav>

    <b-modal v-if="modalShow" v-model="modalShow">
      <template #modal-title>
        {{ packageDetails[0].name }}
      </template>
      <div>
        <h4>type:</h4>
        {{ packageDetails[0].type }}
      </div>
      <div>
        <h4>name:</h4>
        {{ packageDetails[0].name }}
      </div>
      <div v-if="packageDetails[1].tags.length !== 0">
        <h4>tags:</h4>
        <div v-for="(tag, i) in packageDetails[1].tags" :key="i">
          <span>{{ i }}: </span>
          <span>{{ tag }}</span>
        </div>
      </div>
      <div>
        <h4>versions:</h4>
        <span
          class="mr-2"
          v-for="(version, i) in packageDetails[1].versions"
          :key="i"
        >
          "{{ version }}"
        </span>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Main",
  data: () => ({
    loading: false,
    packages: null,
    packageDetails: null,
    modalShow: false,
    searchString: "",
    pages: 0,
    currentPage: 0,
    countPage: 10,
  }),
  async created() {
    if (this.$store.getters.packages) {
      await this.$store.dispatch("fetchPackages");
    }

    this.packages = this.$store.getters.packages;
    this.pages = this.packages.length / this.countPage;
    this.loading = true;
  },
  computed: {
    searchResults() {
      return this.searchString
        ? this.packages.filter((pack) => {
            return pack.name.includes(this.searchString);
          })
        : this.packages;
    },
    outputPackages() {
      return this.searchResults.slice(
        this.currentPage,
        this.currentPage + this.countPage
      );
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage >= this.countPage)
        this.currentPage -= this.countPage;
    },
    nextPage() {
      if (this.currentPage < this.packages.length - this.countPage)
        this.currentPage += this.countPage;
    },
    openPage(page) {
      this.currentPage = (page - 1) * this.countPage;
    },
    async openDetails(items) {
      let fetch = await this.$store.dispatch("fetchPackageBy", items);
      this.packageDetails = [items, this.$store.getters.packageBy];
      this.modalShow = true;
      console.log(this.packageDetails);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
