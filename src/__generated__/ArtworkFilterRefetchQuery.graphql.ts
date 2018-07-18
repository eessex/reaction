/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type ArtworkFilterRefetchQueryVariables = {
    readonly artistNodeID: string;
    readonly medium?: string | null;
    readonly major_periods?: ReadonlyArray<string | null> | null;
    readonly partner_id?: string | null;
    readonly for_sale?: boolean | null;
    readonly sort?: string | null;
};
export type ArtworkFilterRefetchQueryResponse = {
    readonly node: ({}) | null;
};



/*
query ArtworkFilterRefetchQuery(
  $artistNodeID: ID!
  $medium: String
  $major_periods: [String]
  $partner_id: ID
  $for_sale: Boolean
  $sort: String
) {
  node(__id: $artistNodeID) {
    __typename
    ... on Artist {
      ...ArtworkFilterRefetch_artist_3vi6l5
    }
    __id
  }
}

fragment ArtworkFilterRefetch_artist_3vi6l5 on Artist {
  __id
  grid: filtered_artworks(aggregations: [TOTAL], medium: $medium, major_periods: $major_periods, partner_id: $partner_id, for_sale: $for_sale, size: 0, sort: $sort) {
    ...ArtworkFilterArtworkGrid_filtered_artworks
    __id
  }
}

fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworks {
  __id
  artworks: artworks_connection(first: 10, after: "") {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    ...ArtworkGrid_artworks
    edges {
      node {
        __id
      }
    }
  }
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}

fragment ArtworkGrid_artworks on ArtworkConnection {
  edges {
    node {
      __id
      image {
        aspect_ratio
      }
      ...GridItem_artwork
    }
  }
}

fragment GridItem_artwork on Artwork {
  image {
    placeholder
    url(version: "large")
    aspect_ratio
  }
  href
  ...Metadata_artwork
  ...Save_artwork
  __id
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  __id
}

fragment Save_artwork on Artwork {
  __id
  id
  is_saved
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message
  cultural_maker
  artists(shallow: true) {
    __id
    href
    name
  }
  collecting_institution
  partner(shallow: true) {
    name
    href
    __id
  }
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    __id
  }
  __id
}

fragment Contact_artwork on Artwork {
  _id
  href
  is_inquireable
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    __id
  }
  partner(shallow: true) {
    type
    __id
  }
  sale_artwork {
    highest_bid {
      display
      __id: id
    }
    opening_bid {
      display
    }
    counts {
      bidder_positions
    }
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistNodeID",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "medium",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "major_periods",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "partner_id",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "for_sale",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "__id",
    "variableName": "artistNodeID",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v5 = [
  v3,
  v4,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkFilterRefetchQuery",
  "id": null,
  "text": "query ArtworkFilterRefetchQuery(\n  $artistNodeID: ID!\n  $medium: String\n  $major_periods: [String]\n  $partner_id: ID\n  $for_sale: Boolean\n  $sort: String\n) {\n  node(__id: $artistNodeID) {\n    __typename\n    ... on Artist {\n      ...ArtworkFilterRefetch_artist_3vi6l5\n    }\n    __id\n  }\n}\n\nfragment ArtworkFilterRefetch_artist_3vi6l5 on Artist {\n  __id\n  grid: filtered_artworks(aggregations: [TOTAL], medium: $medium, major_periods: $major_periods, partner_id: $partner_id, for_sale: $for_sale, size: 0, sort: $sort) {\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n    __id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworks {\n  __id\n  artworks: artworks_connection(first: 10, after: \"\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        __id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  id\n  is_saved\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkFilterRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "InlineFragment",
            "type": "Artist",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "ArtworkFilterRefetch_artist",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "for_sale",
                    "variableName": "for_sale",
                    "type": null
                  },
                  {
                    "kind": "Variable",
                    "name": "major_periods",
                    "variableName": "major_periods",
                    "type": null
                  },
                  {
                    "kind": "Variable",
                    "name": "medium",
                    "variableName": "medium",
                    "type": null
                  },
                  {
                    "kind": "Variable",
                    "name": "partner_id",
                    "variableName": "partner_id",
                    "type": null
                  },
                  {
                    "kind": "Variable",
                    "name": "sort",
                    "variableName": "sort",
                    "type": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkFilterRefetchQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          v2,
          {
            "kind": "InlineFragment",
            "type": "Artist",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "grid",
                "name": "filtered_artworks",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "aggregations",
                    "value": [
                      "TOTAL"
                    ],
                    "type": "[ArtworkAggregation]"
                  },
                  {
                    "kind": "Variable",
                    "name": "for_sale",
                    "variableName": "for_sale",
                    "type": "Boolean"
                  },
                  {
                    "kind": "Variable",
                    "name": "major_periods",
                    "variableName": "major_periods",
                    "type": "[String]"
                  },
                  {
                    "kind": "Variable",
                    "name": "medium",
                    "variableName": "medium",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "partner_id",
                    "variableName": "partner_id",
                    "type": "ID"
                  },
                  {
                    "kind": "Literal",
                    "name": "size",
                    "value": 0,
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "sort",
                    "variableName": "sort",
                    "type": "String"
                  }
                ],
                "concreteType": "FilterArtworks",
                "plural": false,
                "selections": [
                  v2,
                  {
                    "kind": "LinkedField",
                    "alias": "artworks",
                    "name": "artworks_connection",
                    "storageKey": "artworks_connection(after:\"\",first:10)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "after",
                        "value": "",
                        "type": "String"
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 10,
                        "type": "Int"
                      }
                    ],
                    "concreteType": "ArtworkConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "pageInfo",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "hasNextPage",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "endCursor",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "pageCursors",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursors",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "around",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "PageCursor",
                            "plural": true,
                            "selections": v5
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "first",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "PageCursor",
                            "plural": false,
                            "selections": v5
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "last",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "PageCursor",
                            "plural": false,
                            "selections": v5
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "previous",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "PageCursor",
                            "plural": false,
                            "selections": [
                              v3,
                              v4
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "collecting_institution",
                                "args": null,
                                "storageKey": null
                              },
                              v2,
                              v6,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "title",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "date",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "sale_message",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "cultural_maker",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "artists",
                                "storageKey": "artists(shallow:true)",
                                "args": v7,
                                "concreteType": "Artist",
                                "plural": true,
                                "selections": [
                                  v2,
                                  v6,
                                  v8
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "aspect_ratio",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "placeholder",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "url",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": "large",
                                        "type": "[String]"
                                      }
                                    ],
                                    "storageKey": "url(version:\"large\")"
                                  }
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "partner",
                                "storageKey": "partner(shallow:true)",
                                "args": v7,
                                "concreteType": "Partner",
                                "plural": false,
                                "selections": [
                                  v8,
                                  v6,
                                  v2,
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "type",
                                    "args": null,
                                    "storageKey": null
                                  }
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "sale",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Sale",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "is_auction",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "is_live_open",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "is_open",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "is_closed",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  v2
                                ]
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "_id",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_inquireable",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "sale_artwork",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "SaleArtwork",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "highest_bid",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "SaleArtworkHighestBid",
                                    "plural": false,
                                    "selections": [
                                      v9,
                                      {
                                        "kind": "ScalarField",
                                        "alias": "__id",
                                        "name": "id",
                                        "args": null,
                                        "storageKey": null
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "opening_bid",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "SaleArtworkOpeningBid",
                                    "plural": false,
                                    "selections": [
                                      v9
                                    ]
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "counts",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "SaleArtworkCounts",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "bidder_positions",
                                        "args": null,
                                        "storageKey": null
                                      }
                                    ]
                                  },
                                  v2
                                ]
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "id",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_saved",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '0bfe3dfe636f7b80b0f4e8f42bf48a4e';
export default node;
