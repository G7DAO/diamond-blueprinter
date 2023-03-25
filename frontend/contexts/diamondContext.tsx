import { IFacet, IFacetGroup, IPopupData } from '@/types';
import { bool } from 'prop-types';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface IDiamondContextState {
  isPopupShown: boolean;
  showPopup: (data: IPopupData) => void;
  popupData: IPopupData | null;
  hidePopup: () => void;
  togglePopup: () => void;
  facets: IFacet[];
  updateFacet: (facet: IFacet) => void;
  updateSelectedFacets: (facet: IFacet) => void;
  selectedFacets: IFacet[];
  cuttedFacets: IFacet[];
  getSelectedFacetsMethodsNames: (facet: IFacet) => string[];
}

const diamondDefaultContextState: IDiamondContextState = {
  isPopupShown: false,
  showPopup: (data: IPopupData) => undefined,
  popupData: null,
  hidePopup: () => undefined,
  togglePopup: () => undefined,
  facets: [],
  updateFacet: (facet: IFacet) => undefined,
  updateSelectedFacets: (facet: IFacet) => undefined,
  selectedFacets: [],
  cuttedFacets: [],
  getSelectedFacetsMethodsNames: (facet: IFacet) => [],
};

export const DiamondContext = createContext<IDiamondContextState>(diamondDefaultContextState);

export const useDiamondContext = () => useContext(DiamondContext);

export const DiamondContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPopupShown, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<IPopupData | null>(null);
  const [facets, setFacets] = useState<IFacet[]>(testFacets);
  const [selectedFacets, setSelectedFacets] = useState<IFacet[]>(testSelectedFacets);
  const [cuttedFacets, setCuttedFacets] = useState<IFacet[]>(testCuttedFacets);

  const showPopup = (data: IPopupData) => {
    setShowPopup(true);
    setPopupData(data);
  };

  const updateFacet = (facet: IFacet) => {
    // const upDatedFacets: IFacet[] = facets.map((currentFacet) =>
    //   currentFacet.address === facet.address
    //     ? { ...currentFacet, selectedMethods: facet.selectedMethods }
    //     : currentFacet,
    // );
    // setFacets(upDatedFacets);
  };

  const getSelectedFacetsMethodsNames = (facet: IFacet) => {
    const selectedFacet = selectedFacets.find(
      (selectedFacet) => selectedFacet.address === facet.address,
    );
    if (!selectedFacet) return [];
    return selectedFacet.methods.map((method) => method.name);
  };

  const updateSelectedFacets = (updatedFacet: IFacet) => {
    // console.log('update', updatedFacet);
    if (updatedFacet.methods.length === 0) {
      setSelectedFacets((prev) => prev.filter((facet) => facet.address !== updatedFacet.address));
      return;
    }

    if (
      selectedFacets.findIndex((selectedFacet) => selectedFacet.address === updatedFacet.address) <
      0
    ) {
      setSelectedFacets((prev) => [...prev, updatedFacet]);
      return;
    }
    const updatedSelectedFacets = selectedFacets.map((facet) =>
      facet.address === updatedFacet.address ? updatedFacet : facet,
    );
    setSelectedFacets(updatedSelectedFacets);
  };

  useEffect(() => {
    setSelectedFacets([...cuttedFacets]);
  }, [cuttedFacets]);

  const value: IDiamondContextState = {
    cuttedFacets,
    selectedFacets,
    facets,
    popupData,
    isPopupShown,
    showPopup,
    hidePopup: () => setShowPopup(false),
    togglePopup: () => setShowPopup(!isPopupShown),
    updateFacet,
    updateSelectedFacets,
    getSelectedFacetsMethodsNames,
  };
  return <DiamondContext.Provider value={value}>{children}</DiamondContext.Provider>;
};

const testCuttedFacets: IFacet[] = [
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F9',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      // { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: ['method1', 'method3'],
  },
  {
    name: 'MinecraftLike',
    address: '0x12191085d541A586F0e1968355A36E58C9b2b4',
    methods: [
      // { name: 'method1', color: 'red' },
      // { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: [],
    group: 'Fight',
  },
];

const testSelectedFacets: IFacet[] = [
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F9',
    group: 'Craft',
    methods: [
      // { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: ['method1', 'method3'],
  },
];

const testFacets: IFacet[] = [
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F9',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: ['method1', 'method3'],
  },
  {
    name: 'Simple',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
    ],
    // selectedMethods: [],
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: ['method2'],
  },
  {
    name: 'MinecraftLike',
    address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: [],
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: [],
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D4',
    methods: [],
    // selectedMethods: [],
    group: 'Movement',
  },
  {
    name: 'MinecraftLike',
    address: '0x1215991085d541A586F0e1968355A3',
    methods: [],
    // selectedMethods: [],
    group: 'Movement',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950bD0F6B47D464d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Movement',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d12849e950f89bD0F6B47D464d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Fight',
  },
  {
    name: 'MinecraftLike',
    address: '0x12191085d541A586F0e1968355A36E58C9b2b4',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: [],
    group: 'Fight',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D64d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Fight',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F647D464d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Map',
  },
  {
    name: 'MinecraftLike',
    address: '0x1215991085d541A86F0e1968355A36E58C9b2b4',
    methods: [],
    // selectedMethods: [],
    group: 'Map',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B4huD464d25F91',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: [],
    group: 'Map',
  },
];

// const facetGroups: IFacetGroup[] = [
//   {
//     icon: '🛠',
//     name: 'Craft',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: ['method1', 'method3'],
//       },
//       {
//         name: 'Simple',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//         ],
//         selectedMethods: [],
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: ['method2'],
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: [],
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: [],
//       },
//     ],
//   },
//   {
//     icon: '🚶‍♂️️',
//     name: 'Movement',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Movement',
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         methods: [],
//         selectedMethods: [],
//         group: 'Movement',
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Movement',
//       },
//     ],
//   },
//   {
//     icon: '⚔️️️',
//     name: 'Fight',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Fight',
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         methods: [],
//         selectedMethods: [],
//         group: 'Fight',
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Fight',
//       },
//     ],
//   },
//   {
//     icon: '🗺️',
//     name: 'Maps',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Map',
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         methods: [],
//         selectedMethods: [],
//         group: 'Map',
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Map',
//       },
//     ],
//   },
// ];
