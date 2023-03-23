export interface IStoragaData {
  logo: string;
  name: string;
  description?: string;
}

export interface IFacetGroup {
  icon: string;
  name: string;
  facets: IFacet[];
}

export interface IFacet {
  name: string;
  address: string;
  methods: { name: string; color: string }[];
}
