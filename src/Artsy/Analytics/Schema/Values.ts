/**
 * Pages that the user can view.
 */
export enum PageName {
  ArticlePage = "Article",
  ArtistPage = "Artist",
}

/**
 * An entity in the data model that has an ownership relationship to the entity
 * being described, be it a straightforward model such as ‘Artist’ or a more
 * conceptual one like a ‘Consignment Submission’
 *
 * @see {Result.owner}
 * @see {PageView.owner}
 */
export enum OwnerType {
  Article = "Article",
  Artist = "Artist",
  Artwork = "Artwork",
  Conversation = "Conversation",
  Gene = "Gene",
  Show = "Show",
  Invoice = "Invoice",
  Consignment = "ConsignmentSubmission",
}

/**
 * User actions, which can be active or passive ones.
 *
 * TODO: Distinguishing between Click and Tap is a little confusing. Do we always
 *       use Click on Force or do we use Tap when browsing from a mobile device?
 */
export enum ActionType {
  /**
   * A click on a UI element using a mouse-like input device.
   *
   * TODO: Check if ‘Tap’ and this can be combined.
   */
  Click = "Click",

  /**
   * Triggers a pageview in force, skips segment
   */
  ClickedReadMore = "Clicked read more",

  /**
   * Moving the mouse pointer over a UI element or, when browsing on a mobile
   * device, by first tapping the UI element once making it switch into
   * continuous hover mode.
   */
  Hover = "Hover",

  /**
   * A UI element was rendered in the viewport
   */
  Impression = "Impression",
  AuthImpression = "Auth impression",

  /**
   * A UI element that links out to another location
   */
  Link = "Link",

  /**
   * A tap on a UI element using a finger-like input device.
   *
   * TODO: Check if ‘Click’ and this can be combined.
   */
  Tap = "Tap",

  /**
   * BNMO
   */
  SubmittedOrder = "submitted_order",
}

/**
 * The identifier that ties an interaction to a result.
 */
export enum ActionName {
  /**
   * Artist Page
   */
  ArtistFollow = "artistFollow",
  ArtistUnfollow = "artistUnfollow",
  ArtworkAboutTheWork = "Artwork about the work",

  /**
   * Authentication
   */
  ViewEditorial = "viewed editorial",
  Dismiss = "dismiss",
  EmailNextButton = "emailNextButton",
  PasswordNextButton = "passwordNextButton",

  /**
   * Gene Page
   */
  GeneFollow = "geneFollow",
  GeneUnfollow = "geneUnfollow",

  /**
   * Home page events
   */
  HomeArtistRailFollow = "homeArtistRailFollow",
  HomeArtistArtworksBlockFollow = "homeArtistArtworksBlockFollow",

  /**
   * Conversations / Inbox / Messaging
   */
  ConversationSendReply = "conversationSendReply",
  ConversationLink = "conversationLinkUsed",
  InquiryCancel = "inquiryCancel",
  InquirySend = "inquirySend",

  /**
   *  Saves And Follows Events
   */
  SavesAndFollowsWorks = "savesAndFollowsWorks",
  SavesAndFollowsArtists = "savesAndFollowsArtists",
  SavesAndFollowsCategories = "savesAndFollowsCategories",

  /**
   *  Consignment flow
   */
  ConsignmentDraftCreated = "consignmentDraftCreated",
  ConsignmentSubmitted = "consignmentSubmitted",
  ConsignmentInterest = "Interested in selling a work learn more", // TODO: Old schema

  /**
   * Bid flow
   */
  BidFlowAddBillingAddress = "addBillingAddress",
  BidFlowPlaceBid = "placeBid",
  BidFlowSaveBillingAddress = "saveBillingAddress",

  /**
   * Generic
   */
  ReadMoreExpanded = "readMoreExpanded", // TODO: This differs from old event
  InSale = "In current auction", // TODO: Old schema
  InShow = "In featured show", // TODO: Old schema
}

/**
 * Identifier of content that was interacted with
 */
export enum Subject {
  /*
  * Articles
  * TODO: Old schema
  */
  FurtherReading = "Further reading",
  ReadMore = "Read more",
  RelatedArticles = "Related articles",

  /**
   * Buy now checkout flow
   */
  BNMOAskSpecialist = "ask a specialist",
  BNMOReadFAQ = "read faq",
  BNMOProvideShipping = "provide shipping address",
  BNMOArrangePickup = "arrange for pickup",
  BNMOUseShippingAddress = "use shipping address",
}

/**
 * Identifier of a conceptual module on the page.
 */
export enum ContextModule {
  Header = "Header",
  NavigationTabs = "NavigationTabs",

  /**
   * Artist page
   */
  AboutTheWork = "About the work",
  AboutTheWorkPartner = "About the Work (Partner)",
  ArtistOverview = "ArtistOverview",
  ArtistBio = "ArtistBio",
  Biography = "Biography",

  /**
   * Artwork page
   */
  ArtworkTabs = "Artwork tabs",

  /*
  * Articles
  * TODO: Old schema
  */
  FurtherReading = "Further reading",
  ReadMore = "Read more",
  RelatedArticles = "Related articles",

  /**
   * Authentication modal
   */
  MinimalCtaBanner = "MinimalCtaBanner",

  /**
   * Buy Now Make Offer ("Works For You")
   */
  BNMOBanner = "BNMO Banner",

  /**
   * Collection page
   */
  CollectionDescription = "CollectionDescription",
}

export enum Flow {
  ArtworkAboutTheWork = "Artwork about the work",
  ArtworkAboutTheArtist = "Artwork about the artist",
}

export enum Label {
  AboutTheWork = "about_the_work",
  Articles = "articles",
  Biography = "biography",
  ExhibitionHighlights = "exhibition_highlights",
  ReadMore = "ReadMore",
}

export enum Type {
  Button = "Button",
  Tab = "Tab",
}
