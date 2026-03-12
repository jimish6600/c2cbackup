<script type="module">
    window.onload = function () {
        Vue.use(Vuetable);
        Vue.use(Vuetable.VuetablePagination);
        Dropzone.autoDiscover = false;
        new Vue({
        el: '#app',
            components:{
            'vuetable-pagination': Vuetable.VuetablePagination,
            vueDropzone: vue2Dropzone,
            VSwatches: window['vue-swatches']
            },
            data() {
                return {
                    /* Basic Data -> IMPORTANT: PLEASE DO NOT EDIT THIS SECTION */
                    shopifyLoggedInCustomerEmail: document.getElementById('customer_email').value,
                    shop_domain: Shopify.shop,
                    contact_name: document.getElementById('customer_contact_name').value,
                     baseUrl: 'https://api-v2.shipturtle.com/api',
                    moduleItem: {},
                    allPermissions: null,
                    userData: null,
                    statesLoading: false,
                    countriesLoading: false,
                    isStateMandatory: true,
                    localUpdatedFields: {
                        variants: [],
                        meta_data: [],
                        options: [],
                    },
                    translations: {
                        'en': {
                            "menu": {
                                'Listings': 'Listings',
                                'Orders': 'Orders',
                                'Chats': 'Chats',
                                'Profile': 'Profile',
                                "Barter" : "Barter",
                                'Offers': 'Offers',
                                'Auction': 'Auction',
                                'Booking': 'Booking',
                            },
                            "orders": {
                                'all': 'All',
                                'new': 'New',
                                'confirmed': 'Confirmed',
                                'ready-to-ship': 'Ready to Ship',
                                'in-transit': 'In-transit',
                                'delivered': 'Delivered',
                                'cancelled': 'Cancelled',
                                'returned': 'Returned',
                                'no-orders-found': 'No orders found'
                            },
                            "barter":{
                                "date-created" :"Date Created",
                                "customer" : "Customer",
                                "product-title" : "Product Title",
                                "product-description" : "Product Description",
                                "category" :"Category",
                                "condition" : "Condition",
                                "status" : "Status",
                                "action" : "Action",
                                'rejection-reason-optional': 'Rejection Reason (Optional)'
                            },
                            "offers": {
                                'date': 'Date',
                                'item_title': 'Item Title',
                                'current_price': 'Current Price',
                                'offer_price': 'Offer Price',
                                'requested_quantity': 'Requested Quantity',
                                'offer_order_value': 'Offer Order Value',
                                'counter_price': 'Counter Price',
                                'counter_quantity': 'Counter Quantity',
                                'counter_order_value': 'Counter Order Value',
                                'vendor_name': 'Vendor Name',
                                'customer': 'Customer',
                                'status': 'Status',
                                'action': 'Action',
                                'approve': 'Approve',
                                'reject': 'Reject',
                                'counter': 'Counter',
                                'rejection-reason-optional': 'Rejection Reason (Optional)',
                                'approved': 'Approved',
                                'countered': 'Countered',
                                'pending': 'Pending',
                                'rejected': 'Rejected',
                                'offer-price': 'Offer Price',
                                'counter-offer-price': 'Counter Offer Price',
                                'counter-offer-quantity': 'Counter Offer Quantity',
                                'counter-order-value': 'Counter Order Value',
                                'qty': 'Qty',
                                'offer-order-value': 'Offer Order Value',
                                'customer': 'Customer',
                                'date': 'Date',
                                'title': 'Title',
                                'price': 'Price',
                            },
                            "chats": {
                                'date': 'Date',
                                'type': 'Type',
                                'sender': 'Sender',
                                'receiver': 'Receiver',
                                'message': 'Message',
                                'status': 'Status',
                                'action': 'Action'
                            }
                        },
                        'pt-BR': {
                            "menu": {
                                'Listings': 'Listas',
                                'Orders': 'Pedidos',
                                'Chats': 'Chats',
                                'Profile': 'Perfil'
                            },
                            "orders": {
                                'all': 'Todos',
                                'new': 'Novo',
                                'confirmed': 'Confirmado',
                                'ready-to-ship': 'Pronto para Envio',
                                'in-transit': 'Em Trânsito',
                                'delivered': 'Entregue',
                                'cancelled': 'Cancelado',
                                'returned': 'Devolvido',
                                'no-orders-found': 'Nenhum pedido encontrado'
                            },
                            "offers": {
                                'date': 'Data',
                                'item_title': 'Título do Item',
                                'current_price': 'Preço Atual',
                                'offer_price': 'Preço da Oferta',
                                'requested_quantity': 'Quantidade Solicitada',
                                'offer_order_value': 'Valor do Pedido da Oferta',
                                'counter_price': 'Preço da Contraproposta',
                                'counter_quantity': 'Quantidade da Contraproposta',
                                'counter_order_value': 'Valor do Pedido da Contraproposta',
                                'vendor_name': 'Nome do Vendedor',
                                'customer': 'Cliente',
                                'status': 'Status',
                                'action': 'Ação',
                                'approve': 'Aprovar',
                                'reject': 'Rejeitar',
                                'counter': 'Contraproposta',
                                'rejection-reason-optional': 'Motivo da Rejeição (Opcional)',
                                'approved': 'Aprovado',
                                'countered': 'Contraproposta Feita',
                                'pending': 'Pendente',
                                'rejected': 'Rejeitado',
                                'offer-price': 'Preço da Oferta',
                                'counter-offer-price': 'Preço da Contraproposta',
                                'counter-offer-quantity': 'Quantidade da Contraproposta',
                                'counter-order-value': 'Valor do Pedido da Contraproposta',
                                'qty': 'Qtd',
                                'offer-order-value': 'Valor do Pedido da Oferta',
                                'customer': 'Cliente',
                                'title': 'Título',
                                'price': 'Preço',
                            },
                            "chats": {
                                'date': 'Data',
                                'type': 'Tipo',
                                'sender': 'Remetente',
                                'receiver': 'Receptor',
                                'message': 'Mensagem',
                                'status': 'Status',
                                'action': 'Ação'
                            }
                        }
                    },
                    currentLanguage: null,
                    submitLoading: false,

                    /* Pagination */
                    itemsPerPage: 25,

                    /* States */
                    isMouseOntheTable: null,
                    loading: false,

                    /* Tabs */
                    pageNames: ['MyProducts', 'Orders', 'Chats', 'profile'],
                    tabNames: ['Listings', 'Orders', 'Chats', 'Profile'],
                    tabConfig: {
                        fill: false,
                        pills: true,
                        orientation: 'horizontal',
                        position: 'start', /* 'start', 'end' */
                    },
                    currentPage: 'MyProducts',
                    activeTab: 0,

                    /* Products */
                    isEditProductsPage: false,
                    addEditProductErrors: {},
                    requiredFields: {
                        'price': 'Price is required',
                        'title': 'Title is required',
                    },

                    showAddModal: false,
                    showDeleteModal: false,
                    pendingApprovalProducts: [],
                    activeProducts : [],
                    allProductsCount: 0,
                    pendingApprovalProductsCount: 0,
                    activeProductsCount: 0,
                    active_products_loading: false,
                    pending_products_loading: false,
                    all_products_loading: false,
                    editProductId: null,
                    deleteProductData: null,
                    deletedImages: [],
                    images: [],
                    imageUrls: [],
                    categoryOptions: null,
                    bookingTypeOptions: null,
                    display_videos: [],
                    products: [],
                    productData: {
                        title: '',
                        description: '',
                        quantity: 0,
                        price: 0,
                        length: '',
                        width: '',
                        height: '',
                        weight: '',
                        category: '',
                        product_type: '',
                        rental_rule_id: null,
                        images: [],
                        old_videos : [],
                        videos: [],
                        display_videos: [],
                        old_images: '',
                        default_variant_id: '',
                        admin_graphql_api_id: '',
                        status: '',
                        merchant_comments: null,
                        inventory_management: true,
                        requires_shipping: true
                    },
                    firstVariant: null,
                    customFields: [],
        allMetaFields: [],

                    metaData: {},
                    userSelectedCustomFields: [],
                    mandatoryCustomFields: [],
                    metafield_file_item: null,
                    dimensionsOptions: [
                        {
                        text: 'In',
                        value: 'in'
                        },
                        {
                        text: 'Ft',
                        value: 'ft'
                        },
                        {
                        text: 'Yd',
                        value: 'yd'
                        },
                        {
                        text: 'Mm',
                        value: 'mm'
                        },
                        {
                        text: 'Cm',
                        value: 'cm'
                        },
                        {
                        text: 'M',
                        value: 'm'
                        }
                    ],
                    dimensionObject: {
                        unit: 'in',
                        value: null
                    },
                    metaFieldDropZoneOptions: {
                        url: 'https://api-v2.shipturtle.com/api/v1/save-temp-files',
                        thumbnailHeight: 200,
                        maxFilesize: 200,
                        previewTemplate: `<div class="dz-preview dz-file-preview mb-3">
                                <div class="d-flex flex-row "> 
                                    <div class="p-0 w-30 position-relative">
                                        <div class="dz-error-mark"><span><i></i></span></div>
                                        <div class="dz-success-mark"><span><i></i></span></div>
                                        <div class="preview-container">
                                            <img data-dz-thumbnail class="img-thumbnail border-0" style="height: 58px;" />
                                            <i class="simple-icon-doc preview-icon"></i>
                                        </div>
                                    </div>
                                    <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                                        <div><span data-dz-name /></div>
                                        <div class="text-primary text-extra-small" data-dz-size /></div>
                                        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                                        <div class="dz-error-message"><span data-dz-errormessage></span></div>
                                    </div>
                                    <a href="#" class="remove" data-dz-remove> 
                                        <i class="glyph-icon fa fa-trash pointer"></i> 
                                    </a>
                                </div>
                            </div>`,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            'contentType': false,
                            'processData': false,
                            'Accept': 'application/json' 
                        },
                        addRemoveLinks: true,
                        dictDefaultMessage: "Please drag and drop images here or click to select files",
                        dictRemoveFile: "Remove",
                        maxFiles: 1,
                        acceptedFiles: ".jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.webp",
                        timeout: 120000,
                        removeType: 'server',
                    },
                    dropzoneOptions: {
                        url: 'https://api-v2.shipturtle.com/api/v1/save-temp-files',
                        thumbnailHeight: 200,
                        maxFilesize: 200,
                        previewTemplate: `<div class="dz-preview dz-file-preview mb-3">
                                <div class="d-flex flex-row "> 
                                    <div class="p-0 w-30 position-relative">
                                        <div class="dz-error-mark"><span><i></i></span></div>
                                        <div class="dz-success-mark"><span><i></i></span></div>
                                        <div class="preview-container">
                                            <img data-dz-thumbnail class="img-thumbnail border-0" style="height: 58px;" />
                                            <i class="simple-icon-doc preview-icon"></i>
                                        </div>
                                    </div>
                                    <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                                        <div><span data-dz-name /></div>
                                        <div class="text-primary text-extra-small" data-dz-size /></div>
                                        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                                        <div class="dz-error-message"><span data-dz-errormessage></span></div>
                                    </div>
                                    <a href="#" class="remove" data-dz-remove> 
                                        <i class="glyph-icon fa fa-trash pointer"></i> 
                                    </a>
                                </div>
                            </div>`,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            'contentType': false,
                            'processData': false,
                            'Accept': 'application/json' 
                        },
                        addRemoveLinks: true,
                        dictDefaultMessage: "Please drag and drop images here or click to select files",
                        dictRemoveFile: "Remove",
                        acceptedFiles: ".jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.webp, video/*",
                        timeout: 120000,
                        removeType: 'server',
                    },

                    /* Orders */
                    currentOrderTab: 'AllOrders',
                    current_orders_loading: null,
                    orders_infinite_scroll_loading: false,
                    order_status_change_loading: 0,
                    orders: [],
                    singleOrderData: null,

                    /* Order Details */
                    save_tracking_loading: false,
                    trackingNumber: null,
                    trackingUrl: null,
                    shippingCarrier: null,
                    shipment_status_change_loading: 0,
                    pickupAction: 'addNewWarehouse', 
                    warehouse_id: null,
                    editPickupAddressData: {
                        title: "",
                        contact_name: "",
                        email: "",
                        phone_number: "",
                        country: "",
                        state: "",
                        city: "",
                        address_line_1: "",
                        address_line_2: "",
                        pin_code: "",
                    },
                    pickup_details_same_as_company_details: false,
                    totalBillableQuantity: 0,
                    /* Barter */
                    barters: [],
                    bartersLoading : false,
                    barterActionLoading: false,
                    singleBarterData: {},
                    barterRejectionReason: null,
                    barterOfferDetails : null,
                    barterPageNumber : 1,
                    bartersPerPage: 10,
                    bartersCount : 0,
                    lastBarterPageShown: false,
                    slide: 0,
                    sliding: null,
                    /* Offers */
                    lastOffersPageShown: false,
                    offersPageNumber: 1,
                    offersPerPage: 10,
                    offersCount: 0,
                    offers: [],
                    singleOfferData: {},
                    rejectionReason: null,
                    offerActionLoading: false,
                    offersLoading: false,
                    counterOfferPrice: null,
                    counterOfferQuantity: null,
                    counterOfferQuantityChanged: false,
                    counterOfferPriceChanged: false,
                    note: null,

                    /* Chats */
                    chats_loading: false,
                    chatsCount: 0,
                    chats: [],
                    singleChatData: {},
                    chatReplies: [],
                    replyMessage: '',
                    submitReplyLoading: false,
                    chatRepliesLoading: false,
                    showReplyTextArea: false,
                    chatsPageNumber: 1,
                    chatsPerPage: 10,
                    pageNumber: 1,
                    lastChatsPageShown: false,
                    disableSendBtn: false,
                    isChatModalViewOnly: true,
                    
                    /* Profile */
                    /* Bio */
                    editProfileData: {
                        contact_name: "",
                        email: "",
                        phone_number: "",
                        country: "",
                        state: "",
                        state_code: "",
                        city: "",
                        address_line_1: "",
                        address_line_2: "",
                        pin_code: "",
                        tiktok_link: null,
                        facebook_link: null,
                        instagram_link: null,
                        twitter_link: null,
                        about_us: null,
                        logo: null,
                        logo_link: null
                    },
                    /* Payment Methods */
                    provider: 'manual',
                    paymentGateway: [
                        { value: 'manual', text: 'Manual' },
                        { value: 'stripe', text: 'Stripe' },
                        { value: 'paypal', text: 'Paypal' }
                    ],
                    paymentMethodOptions: [
                        { value: 'bank_transfer', text: 'Bank Transfer' }
                    ],
                    paymentMethod: {
                        provider: 'manual',
                        payment_method: 'bank_transfer',
                        bank_company_name: null,
                        account_name: null,
                        account_number: null,
                        sort_code: null,
                        other_information: null,
                        nick_name: null
                    },
                    paypal_email: null,
                    stripe_enabled: false,
                    paypal_enabled: false,
                    stripeErrorMessage: null,
                    vendorAccountDetails: {},
                    /* Registration */
                    registerVendorLoading: false,
                    first_name: document.getElementById('customer_first_name').value,
                    last_name: document.getElementById('customer_last_name').value,
                    countries: [],
                    states: [],
                    slide: 0,
                    sliding: null,
                    phone_number: '',
                    country: '',
                    state: '',
                    city: '',
                    address_line_1: '',
                    address_line_2: '',
                    pincode: '',
                    /* Booking -> IMPORTANT: PLEASE DO NOT EDIT THIS SECTION */
                    searchQueryBookingType: '',
                    bookingdata: [],
                    bookingfields: [
                      { key: 'created_at', label: 'Start Date', thStyle: { width: '10%' }, thClass: 'text-center font-weight-bold', tdClass: 'text-center'  },
                      { key: 'rule_name', label: 'Title',thStyle: { width: '10%' }, thClass: 'text-center font-weight-bold', tdClass: 'text-center'  },
                      { key: 'booking_type', label: 'Booking Type', thStyle: { width: '10%' }, thClass: 'text-center font-weight-bold', tdClass: 'text-center text-capitalize' },
                      { key: 'status', label: 'Status', thStyle: { width: '10%' }, thClass: 'text-center font-weight-bold', tdClass: 'text-center' },
                      { key: 'actions', label: 'Actions', thStyle: { width: '10%' }, thClass: 'text-center font-weight-bold', tdClass: 'text-center' }
                    ],
                    isEditAddBookingType: false,
                    isForAddBookingType: false,
                    bookingdata: [],
                    isLoadingBookingType: false,
                    isUpdatingBookingType: false,
                    isSavingBookingType: false,
                    formBookingType: {
                        rule_name: null,
                        booking_type: 'rental',
                        maximum_quantity: null,
                        fixed_booking_time_duration: {
                            time: null,
                            format: 'Hour',
                        },
                        lag_time: {
                            time: null,
                            format: 'Minutes',
                        },
                        available_date_range: {
                            count: 'Days',
                            start_time: '06:00:00',
                            end_time: '06:00:00',
                        },
                        date_picker: {
                            cutoff_days: {
                                time: null,
                                format: 'Days',
                            },
                            future_days: null,
                        },
                        operating_hours: {
                            Sunday: { from: null, to: null, slot_status: false },
                            Monday: { from: null, to: null, slot_status: false },
                            Tuesday: { from: null, to: null, slot_status: false },
                            Wednesday: { from: null, to: null, slot_status: false },
                            Thursday: { from: null, to: null, slot_status: false },
                            Friday: { from: null, to: null, slot_status: false },
                            Saturday: { from: null, to: null, slot_status: false },
                        },
                    },
                    daysBookingType: [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ],
                    pageBookingType: 1,
                    perPageBookingType: 10,
                    totalPagesBookingType: 1,
                }

            },
            methods: {
                /* User -> IMPORTANT: PLEASE DO NOT EDIT THIS SECTION */
                getAuthHeaders() {
                    return {
                        'Authorization': `Bearer ${localStorage.getItem('stAuth')}`
                    };
                },
                setAuthToken () {
                    return new Promise((resolve, reject) => {
                        axios.get(`${this.baseUrl}/v2/shops/check-existence`, {
                            params: {'shop_domain': this.shop_domain,'login_customerId':ShopifyAnalytics.meta.page.customerId,'customer_email':this.shopifyLoggedInCustomerEmail},
                        })
                        .then(res => {
                            const stAuth = localStorage.getItem('stAuth');
                            const data = res.data;
                            if (stAuth) {
                                localStorage.removeItem('stAuth');
                            }
                            if (data.approved_status === true && data[0].accessToken) {
                                localStorage.setItem('stAuth', data[0].accessToken);
                                this.metaFieldDropZoneOptions.headers = {
                                    ...this.metaFieldDropZoneOptions.headers,
                                    'Authorization': `Bearer ${data[0].accessToken}`
                                };
                                this.dropzoneOptions.headers = {
                                    ...this.dropzoneOptions.headers,
                                    'Authorization': `Bearer ${data[0].accessToken}`
                                };
                            }
                            resolve(data)
                        }).catch((error) => {
                            console.error(error)
                        })
                    })
                },
                setupUserDataAndPermissions () {
                    return new Promise((resolve, reject) => {
                        this.loading = true;
                        this.$nextTick(() => {
                        const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                        };
                        const userApiEndPoint = `${this.baseUrl}/v1/customer-to-customer/me`;
                        const myVisibilitiesEndPoint = `${this.baseUrl}/v1/my-visibilities`;

                        axios.get(myVisibilitiesEndPoint, { headers })
                        .then (res => {
                            this.moduleItem = Object.fromEntries(
                                res.data.modules.map(({ slug, pivot }) => [
                                slug,
                                pivot?.values,
                                ]),
                            );
                            let permissions = res.data.all_permissions;
                            if (typeof permissions === 'object') {
                                this.allPermissions = Object.keys(permissions).map((key) => permissions[key]);
                            } else {
                                this.allPermissions = permissions;
                            }
                        });
                        axios.get(userApiEndPoint, { headers })
                            .then(response => {
                                this.userData = response.data.data;
                                resolve(response.data.data);
                            })
                            .catch(error => {
                                console.error('Error on API:', error);
                                reject(error);
                            })
                            .finally(() => {
                                this.loading = false;
                            });
                        })
                    })
                },

                getDefaultUpdatedFields() {
                    return {
                        variants: [],
                        meta_data: [],
                        options: [],
                    };
                },

                markProductFieldAsUpdated(field) {
                    this.localUpdatedFields[field] = true;
                },

                markMetafieldsAsUpdated(slug) {
                    const temp = {};
                    temp[slug] = true;
                    this.localUpdatedFields.meta_data.push(temp);
                },

                /* General */
                hasPermission(permission, module = null) {
                    if (module !== null) {
                        if (!this.moduleItem || !(module in this.moduleItem)) {
                            return false;
                        }
                    }
                    return this.allPermissions && this.allPermissions.includes(permission);
                },
                showToast(message, type = 'success') {
                    const toaster = document.getElementById('custom-toaster');
                    toaster.innerText = message;
                    toaster.style.backgroundColor = type === 'success' ? 'green' : 'red';
                    toaster.classList.add('show');

                    setTimeout(() => {
                        toaster.classList.remove('show');
                    }, 3000); 
                },
                formatDate(date) {
                    const formattedDate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric'});
                    return formattedDate;
                },
                isTriggeredByInfiniteScrolling (type) {
                    return type === 'infinite-scrolling';
                },          
                /* Centralized URL builder to preserve dashboard params */
                buildDashboardUrl(pageName, extraParams = {}, removeKeys = []) {
                    const params = new URLSearchParams(window.location.search);
                    if (pageName) params.set('page', pageName);
                    removeKeys.forEach((key) => params.delete(key));
                    Object.entries(extraParams).forEach(([key, value]) => {
                        if (value !== undefined && value !== null && value !== '') {
                            params.set(key, value);
                        }
                    });
                    return `${window.location.pathname}?${params.toString()}`;
                },
                openPage(pageName, data, productType, isOnPageReload = false) {
                    this.allMetaFields = [];
                    this.currentPage = pageName;
                    const searchParams = new URLSearchParams(window.location.search);

                    let id = null;
                    let isOrderDetails = null;
                    let productTypeParam = null;
                    if (isOnPageReload) {
                        id = searchParams.get('id');
                        isOrderDetails = searchParams.get('isOrderDetails');
                        productTypeParam = searchParams.get('productType');
                    }
                    const newUrl = this.buildDashboardUrl(pageName, {}, ['id', 'isOrderDetails', 'productType']);
                    window.history.pushState({ path: newUrl }, '', newUrl);
                    
                    if(pageName === 'MyProducts') {
                        this.fetchBookingTypes();
                        this.fetchCategories();
                        this.fetchActiveProducts('pageOpened');
                        this.fetchPendingApprovalProducts();
                    }
                    if(pageName === 'Booking') {
                        this.currentPage = 'Booking';
                        this.fetchBooking();
                    }
                    if(pageName === 'addBooking') {
                        this.currentPage = 'create_booking';
                        this.openAddBookingType();
                    }
                    if(pageName === 'editBooking') {
                        this.currentPage = 'edit_booking';
                        this.openEditBookingType(data);
                    }
                    if(pageName === 'Orders') {
                        if ((id || data?.id) && isOrderDetails) {
                            this.currentOrderTab = 'OrderDetailsPage';
                            this.openOrdersTab('OrderDetailsPage', id || data.id);
                        } else {
                            this.openOrdersTab('AllOrders');
                        }
                    }

                    if(pageName === 'profile') {
                        this.editProfile();
                    }

                    if(pageName === 'editListing'){
                        const newUrl = this.buildDashboardUrl(pageName, {id: id || data?.id, productType: productTypeParam || productType});
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        this.isEditProductsPage = true;
                        this.currentPage = 'listing';
                        this.resetListingForm();
                        this.fetchCategories();
                        this.openEditProduct(data, productType || productTypeParam);
                    }
                    
                    if(pageName === 'addListing') {
                        this.fetchBookingTypes();
                        this.isEditProductsPage = false;
                        this.resetListingForm();
                        this.currentPage = 'listing';
                        this.fetchCategories();
                        this.setCustomField();
                    }
                    if(pageName === 'Barter'){
                        this.fetchBarters();
                    }
                    if (pageName === 'Offers') {
                        this.fetchOffers();
                    }

                    if (pageName === 'Chats') {
                        this.fetchChats();
                    }

                },
                routeBack() {
                    const urlParams = new URLSearchParams(window.location.search);
                    const ordersPage = urlParams.get('page');
                    if(ordersPage === 'Orders'){
                        this.openOrdersTab('AllOrders');
                    } else if (ordersPage === 'New'){
                        this.openOrdersTab('New');
                    }  else if (ordersPage === 'Confirmed'){
                        this.openOrdersTab('Confirmed');
                    }  else if (ordersPage === 'In-transit'){
                        this.openOrdersTab('In-transit');
                    }  else if (ordersPage === 'Delivered'){
                        this.openOrdersTab('Delivered');
                    }  else if (ordersPage === 'Cancelled'){
                        this.openOrdersTab('Cancelled');
                    }  else if (ordersPage === 'Returned'){
                        this.openOrdersTab('Returned');
                    } else if (ordersPage === 'addListing'){
                        this.openPage('MyProducts');
                    } else if (ordersPage === 'editListing'){
                        this.firstVariant = null;
                        this.openPage('MyProducts');
                    }
                },

                handleTabChange(prevIndex, nextIndex) {
                    this.$nextTick(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                },

                /* Data Table */
                onPaginationData (paginationData) {
                    this.$refs.pagination.setPaginationData(paginationData);
                },
                onChangePage (page) {
                    this.$refs.productsTable.changePage(page);
                },


                /* Dropzone */
                dropzoneTemplate () {
                    return `<div class="dz-preview dz-file-preview mb-3">
                            <div class="d-flex flex-row "> <div class="p-0 w-30 position-relative">
                                <div class="dz-error-mark"><span><i></i>  </span></div>
                                <div class="dz-success-mark"><span><i></i></span></div>
                                <div class="preview-container">
                                <img data-dz-thumbnail class="img-thumbnail border-0" />
                                <i class="simple-icon-doc preview-icon"></i>
                                </div>
                            </div>
                            <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                            <div> <span data-dz-name /> </div>
                            <div class="text-primary text-extra-small" data-dz-size /> </div>
                            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                            <div class="dz-error-message"><span data-dz-errormessage></span></div>
                            </div>
                            <a href="#" class="remove" data-dz-remove> <i class="glyph-icon fa fa-trash pointer"></i> </a>
                        </div>
                        `
                },
                metaFieldPrepopulateFile (item) {
                    let value = this.metaData[item.name_slug] && this.metaData[item.name_slug].value;
                    if (value && item.belongs_to === 'channel') {
                        const fileName = value.split('/').pop();
                        const file = {
                            src: value,
                            name: fileName,
                            size: 1222,
                            uuid: 12345678
                        };
                        this.$refs['metafieldDropzone_' + item.field_name][0].manuallyAddFile(file, file.src);
                    }
                },
                prePopulateFIle () {
                    this.images.forEach(image => {
                        this.$refs.productDropzone.manuallyAddFile(image, image.src);
                    });
                    this.display_videos && this.productData.display_videos.forEach(video => {
                        this.$refs.productDropzone.manuallyAddFile(video, video.src);
                    })
                },
                metaFieldFileRemoved (file, item) {
                    this.customFieldChanged([], item);
                },
                imageRemoved (file, error, xhr) {
                    if (file.type.includes('image')) {
                        this.images = this.images.filter(imageObject => {
                        return !(
                            (file.upload && file.upload.uuid === imageObject.uuid) ||
                            file.uuid === imageObject.uuid
                            )
                        })

                        this.markProductFieldAsUpdated('images');
                    }
                    if (file.type.includes('video')) {
                        this.productData.old_videos = this.productData.display_videos.filter(videoObject => {
                        return (
                            (file.upload && file.upload.uuid === videoObject.uuid) ||
                            file.uuid === videoObject.uuid
                        )
                        })

                        this.markProductFieldAsUpdated('videos');
                    }
                },
                manuallyAddFile (file) {
                    this.productData.images.push(file);
                },
                fileAdded (value) {
                    this.$emit('vdropzone-file-added', value);
                },
                errorEvent (files, message, xhr) {
                    this.$refs.productDropzone.removeFile(files);
                    this.showToast(`Sorry the file was not successfully imported ${message}`, 'error');
                    this.$emit('vdropzone-error', files, message, xhr);
                },
                fileRemoved (index) {
                    this.$emit('vdropzone-removed-file', this.images[index]);
                    this.images.splice(index, 1);
                },
                metaFieldFileAdded (file, item) {
                    this.metafield_file_item = item
                },
                metaFieldSuccessEvent (file, response) {
                    let files = [];
                    file.src = response.data.file_link_url;
                    files.push({ uuid: file.upload.uuid, src: response.data.file_link_url ? response.data.file_link_url[0] : '', size: file.size, name: file.name, type: file.type });
                    this.customFieldChanged(files, this.metafield_file_item);
                },
                successEvent (file, response) {
                    const route = new URLSearchParams(window.location.search);
                    const currentOrderPage = route.get('page');

                    this.$emit('vdropzone-success', file, response);
                    if (file.type.includes('image')) {
                        this.images.push({
                        uuid: file.upload.uuid,
                        src: response.data.file_link_url[0],
                        size: file.size,
                        name: file.name,
                        type: file.type
                        })

                        this.markProductFieldAsUpdated('images');
                    }
                    if (file.type.includes('video')) {
                        this.productData.videos.push({
                        uuid: file.upload.uuid,
                        src: response.data.file_link_url[0],
                        size: file.size,
                        file_name: file.name,
                        type: file.type,
                        id: response.data.id
                        })

                        this.markProductFieldAsUpdated('videos');
                    }
                },
                imageUploadInProgress(isUploading) {
                    if (isUploading) {
                        const wizardFooterRight = document.getElementsByClassName('wizard-footer-right');
                        wizardFooterRight[0].getElementsByClassName('wizard-btn')[0].disabled = true;
                    } else {
                        const wizardFooterRight = document.getElementsByClassName('wizard-footer-right');
                        wizardFooterRight[0].getElementsByClassName('wizard-btn')[0].disabled = false;
                    }
                },
                selectImage (imageIndex) {
                    this.$emit('selectedImage', imageIndex);
                },
                uploadComplete () {
                    this.$emit('vdropzone-queue-complete');
                },


                /* Registration */
                registerVendor() {
                    this.registerVendorLoading = true;

                    const formData = new FormData();
                    formData.set('contact_name', this.first_name + ' ' + this.last_name);
                    formData.set('email', this.shopifyLoggedInCustomerEmail);
                    formData.set('shop_domain', this.shop_domain);
                    formData.set('is_c2c_marketplace', 'true');
                    formData.set('company_name', this.first_name + ' ' + this.last_name);
                    formData.set('brand_name', this.first_name + ' ' + this.last_name);
                    formData.set('phone_number', this.phone_number);
                    formData.set('country', this.country);
                    formData.set('state', this.state);
                    formData.set('state_code', this.state);
                    formData.set('city', this.city);
                    formData.set('address_line_1', this.address_line_1);
                    formData.set('address_line_2', this.address_line_2);
                    formData.set('pin_code', this.pincode);

                    axios.post(`${this.baseUrl}/v2/create-new-vendor-v2`, formData)
                        .then(response => {
                            this.showToast('Registered successfully', 'success');                        
                        }).then(() => {
                            axios.get(`${this.baseUrl}/v2/shops/check-existence`)
                            .then(res => {
                                const stAuth = localStorage.getItem('stAuth');
        
                                if (stAuth) {
                                    localStorage.removeItem('stAuth');
                                }
                                
                                if (res.approved_status === true && res[0].accessToken) {
                                    localStorage.setItem('stAuth', res[0].accessToken);
                                }
                            })
                        })
                        .catch(error => {
                            console.error('Error registering vendor:', error);
                            this.showToast('Error while registrating, please try again later.', 'failure');
                        })
                        .finally(() => {
                            this.registerVendorLoading = false;
                            window.location.reload();
                        });
                },
                async fetchCountries() {
                    try {
                        this.loading = true;
                        this.countriesLoading = true;
                        const headers = this.getAuthHeaders();
                        const {data} = await axios.get(`${this.baseUrl}/v1/country`, { headers });
                        this.countries = data;
                    } catch (error) {
                        this.showToast('Error while fetching countries', 'failure');
                    } finally {
                        this.loading = false;
                        this.countriesLoading = false;
                    }
                },
                async fetchStates(countryCode = null) {
                    try {
                        let country = countryCode || this.country;
                        let apiEndpoint = `${this.baseUrl}/v1/states/${country}/{"title": ""}`;
                        const headers = this.getAuthHeaders();
                        if (!country) {
                            return;
                        }
                        this.statesLoading = true;
                        const response = await axios.get(apiEndpoint, { headers });
                        this.states = response.data.data;
                        this.isStateMandatory = this.states.length > 0;
                        return response.data.data;
                    } catch (error) {
                        console.error('Error fetching states:', error);
                        this.showToast('Error while fetching states.', 'failure');
                        throw error;
                    } finally {
                        this.statesLoading = false;
                    }
                },


                /* Products */
                async fetchProducts() {
                    try {
                        this.all_products_loading = true;
                        const response = await axios.get(`${this.baseUrl}/v1/customer-to-customer/product/parent?limit=10&allproducts=true`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            },
                        });
                        this.products = response.data.data;
                        this.allProductsCount = response.data.count;
                        this.all_products_loading = false;
                    } catch (error) {
                        console.error('Error fetching products:', error);
                        this.showToast('Error while fetching products', 'failure');
                    }
                },
                async fetchCategories() {
                    try {
                        let query = {} ;
                        query['title'] = '';
                        let queryparams = JSON.stringify(query);


                        const response = await axios.get(`${this.baseUrl}/v1/product-type/product-type-autocomplete/ + ${encodeURI(queryparams)}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            },
                        }).catch(error => {
                            console.error('Error fetching categories:', error);
                            this.showToast('Error while fetching categories', 'failure');
                        });
                        this.categoryOptions = response.data.data.map(category => ({
                            text: category.title, 
                            value: category.title,
                        }));

                    } catch (error) {
                        console.error('Error fetching categories:', error);
                        this.showToast('Error while fetching categories', 'failure');
                    }
                },
                async fetchBookingTypes() {
                    try {
                    if (!this.userData || !this.userData.company_id) {
                        return;
                    }

                    const response = await axios.get(
                        `${this.baseUrl}/v1/fetch-all-rules-autocomplete/${this.userData.company_id}`,
                        {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('stAuth')}`,
                        },
                        },
                    );

                    const bookingTypes = Array.isArray(response.data)
                        ? response.data
                        : [];

                    this.bookingTypeOptions = bookingTypes.map((bookingType) => ({
                        text: bookingType.rule_name,
                        value: bookingType.id,
                    }));
                    } catch (error) {
                    console.error('Error fetching booking types:', error);
                    this.showToast('Error while fetching booking types', 'failure');
                    }
                },
                async fetchActiveProducts(type = null) {
                    try {
                        this.active_products_loading = true;

                        if(!this.isTriggeredByInfiniteScrolling(type)) {
                            this.pageNumber = 1;
                            this.activeProducts = [];
                            this.activeProductsCount = 0;
                        }

                        this.getProductCount();
                        const activeProductsResponse = await axios.get(`${this.baseUrl}/v1/customer-to-customer/product/parent?query=%7B%22status%22:%22active%22%7D&limit=${this.itemsPerPage}&ascending=0&page=${this.pageNumber}&byColumn=1
                        `, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            },
                        });

                        if (!this.isTriggeredByInfiniteScrolling(type)) {
                            this.activeProducts = activeProductsResponse.data.data;
                        } else {
                            this.activeProducts.push(...activeProductsResponse.data.data);
                        }

                        this.active_products_loading = false;

                    } catch (error) {
                        console.error('Error fetching products', error.message);
                        this.showToast('Error while fetching products', 'failure');
                    }
                },
                async fetchPendingApprovalProducts() {
                    this.pending_products_loading = true;
                    this.getProductCount();

                    await axios.get(`${this.baseUrl}/v1/customer-to-customer/draft-product?query=%7B%7D&limit=100&ascending=0&page=1&byColumn=1
                    `, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                        },
                    }).then(response => {
                        this.pendingApprovalProducts = response.data.data;
                        
                    }).catch(error => {
                        console.error('Error fetching pending approval products:', error);
                        this.showToast('Error while fetching pending approval products', 'failure');
                    }).finally(() => {
                        this.pending_products_loading = false;
                    });
                },
                getProductCount () {
                    axios.get(`${this.baseUrl}/v1/products/count-of-draft-product/all`,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('stAuth')}`
                            }
                        })
                        .then((res) => {
                            this.activeProductsCount = res.data.activeProductCounts;
                            this.pendingApprovalProductsCount = res.data.addDraftProductsCounts;
                        }).catch((error) => {
                            this.activeProductsCount = 0;
                            this.pendingApprovalProductsCount = 0;
                        })
                },
                async setCustomField () {
                    const headers = {
                        'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                    };
                    const customFieldResponse = await axios.get(`${this.baseUrl}/v1/custom-fields/get-fields`, { headers });

                    this.customFields = customFieldResponse.data.map((customField) => {
                        if (customField.attributes.type === 'dimension' && customField.value) {
                            this.dimensionObject = JSON.parse(customField.value);
                        }
                        return customField;
                    })
                },
                updateProductTitle (value) {
                    this.productData.title = value.trim();
                    this.markProductFieldAsUpdated('title');
                },
                updateProductDescription (value) {
                    this.productData.description = value
                    this.markProductFieldAsUpdated('body_html');
                },
                updateProductCategory (value) {
                    this.productData.category = value
                    this.markProductFieldAsUpdated('product_type');
                },
                updateProductBookingType(value) {
                    this.productData.rental_rule_id = value;
                    this.markProductFieldAsUpdated('rental_rule_id');
                },
                updateProductPrice (value) {
                    if(this.firstVariant) {
                        this.firstVariant.price = value
                    } else {
                        this.productData.price = value
                        this.markProductFieldAsUpdated('price');
                    }
                },
                formatDecimalInput(value) {
                    if (value === '' || value === null || value === undefined) {
                        return '';
                    }

                    let strValue = String(value);

                    if (strValue === '.') {
                        return '0.0';
                    }

                    if (strValue.startsWith('.')) {
                        return '0' + strValue;
                    }

                    return strValue;
                },
                formatProductDimension(event, field) {
                    const value = event.target.value;
                    const formattedValue = this.formatDecimalInput(value);
                    if (this.firstVariant) {
                        this.firstVariant[field] = formattedValue;
                    } else {
                        this.productData[field] = formattedValue;
                    }
                    event.target.value = formattedValue;
                },
                updateProductDimension(value, field) {
                    const formattedValue = this.formatDecimalInput(value);
                    if (this.firstVariant) {
                        this.firstVariant[field] = formattedValue;
                    } else {
                        this.productData[field] = formattedValue;
                    }
                    this.markProductFieldAsUpdated(field);
                },
                updateProductQuantity (value) {
                    if(this.firstVariant) {
                        this.firstVariant.inventory_quantity = value
                    }
                    this.productData.quantity = value
                    this.markProductFieldAsUpdated('inventory_quantity');
                },
                setProductData (data) {
                    if (data.variants && data.variants.length > 0) {
                        this.firstVariant = data.variants[0];
                        this.productData.options = data.options;
                    }
                    this.productData.title = data.title;
                    this.productData.description = data.body_html;
                    this.productData.quantity = this.firstVariant ? this.firstVariant.inventory_quantity : data.inventory_quantity;
                    this.productData.price = this.firstVariant ? this.firstVariant.price : data.price;
                    this.productData['length'] = this.firstVariant ? this.firstVariant.length : data['length'];
                    this.productData.width = this.firstVariant ? this.firstVariant.width : data.width;
                    this.productData.height = this.firstVariant ? this.firstVariant.height : data.height;
                    this.productData.weight = this.firstVariant ? this.firstVariant.weight : data.weight;
                    this.productData.category = data.product_type;
                    this.productData.product_type = data.product_type;
                    this.images = data.images;
                    this.display_videos = data.videos;
                    this.productData.display_videos = data.videos;
                    this.productData.images = data.images;
                    this.productData.old_images = data.old_images;
                    this.productData.default_variant_id = data.default_variant_id;
                    this.productData.admin_graphql_api_id = data.admin_graphql_api_id;
                    this.productData.status = data.status;
                    this.metaData = data.meta_data || {};
                    this.productData.merchant_comments = data.merchant_comments;
                    this.productData.inventory_management = true;
                    this.productData.rental_rule_id = data.rental_rule_id || null;
                    this.productData.requires_shipping = data.requires_shipping
                },
                playVideo(){
                    this.$refs.c2cVideo[0].play()
                },
                pauseVideo(){
                    this.$refs.c2cVideo[0].pause()
                },
                openImage() {
                    this.$refs.productDropzone.dropzone.element.click();
                },
                  initializeCustomFields(requiresShipping) {
        if (requiresShipping) {
          this.userSelectedCustomFields = this.allMetaFields.filter(
            (field) => !field.digital_product,
          );
        } else {
          this.userSelectedCustomFields = [...this.allMetaFields];
        }
      },
                addUserSelectedCustomFields() {
                    if(this.customFields.length > 0){
                        this.customFields.forEach(element => {
                             this.allMetaFields.push(element);
                            this.initializeCustomFields(this.requiresShippingValue);
                            if (element.is_mandatory) {
                                this.mandatoryCustomFields.push(element);
                            }
                        });
                    }

                },
                getOptions(options) {
                    return options.map(option => {
                        return { text: option, value: option }
                    })  
                },
                customFieldChanged (value, item) {
                    if (!this.metaData[item.name_slug]) {
                        Vue.set(this.metaData, item.name_slug, {});
                    }
                    if (item.attributes.type === 'list.file') {
                        const listOfFileURLs = value.map(file => file.src);
                        this.metaData[item.name_slug]['value'] = listOfFileURLs;
                    } else if (item.attributes.type === 'images' || item.attributes.type === 'file') {
                        this.metaData[item.name_slug]['value'] = value[0] && value[0].src
                    }  else if(item.attributes.type === 'dimension') {
                        let metaDataValue = this.metaData[item.name_slug]?.value && JSON.parse(this.metaData[item.name_slug]?.value);
                        if (item.isDimensionUnit) {
                            Vue.set(this.metaData[item.name_slug], 'value', JSON.stringify({
                                unit: value,
                                value: metaDataValue?.value
                            }));
                        } else if (item.isDimensionValue) {
                            Vue.set(this.metaData[item.name_slug], 'value', JSON.stringify({
                                unit: metaDataValue?.unit,
                                value: value
                            }));
                        }
                        
                    }
                    else {
                        Vue.set(this.metaData[item.name_slug], 'value', value);
                    }

                    this.metaData[item.name_slug]['key'] = item.name_slug;
                    this.metaData[item.name_slug]['name_slug'] = item.name_slug;
                    this.metaData[item.name_slug]['type'] = item.attributes.type;
                    this.metaData[item.name_slug]['show_on_shop'] = item.show_on_shop;
                    this.metaData[item.name_slug]['digital_product'] = item.digital_product;
                    this.metaData[item.name_slug]['belongs_to'] = item.belongs_to;
                    this.metaData[item.name_slug]['channel_type'] = item.channel_type;
                    if (item.digital_product) {
                        this.metaData[item.name_slug]['namespace'] = 'st_digital_product';
                    } else {
                        if (item.belongs_to === 'channel') {
                        this.metaData[item.name_slug]['namespace'] = 'shipturtle';
                        } else {
                        this.metaData[item.name_slug]['namespace'] = 'shipturtle_product';
                        }
                    }

                    this.markMetafieldsAsUpdated(item.name_slug);

                },
                popoverMethodForCommission(productTitle, commission, currency, earnings) {
                    return '<div class="p-4 st-commission-container"><h4 class="mb-4 bold">'+ productTitle + '</h4><b class="mb-2">Commission: ' + commission + '%</b> </br> <b class="mb-4">Your earnings: '+ currency + earnings + '</b><p class="mb-4">For each product you sell, commissions are set by the merchant. This can be subjective to various factors including the product category or other info you provide </p> </div>';
                },
                fetchMoreProductsOnscrollTrigger () {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                this.pageNumber += 1;
                                if (this.pageNumber <= this.totalActiveProductsPages) {
                                    this.fetchActiveProducts('infinite-scrolling')
                                } else {
                                    observe.unobserve(entry.target)
                                }
                            }
                        })
                    });

                    observer.observe(this.$refs.intersectionObeserverTarget);
                },
                
                
                /* Add/Edit/Delete Products */
                resetListingForm () {
                    this.productData = {
                        title: '',
                        description: '',
                        quantity: '',
                        price: '',
                        length: '',
                        width: '',
                        height: '',
                        weight: '',
                        category: '',
                        rental_rule_id: null,
                        images: [],
                        videos: [],
                        display_videos: [],
                        old_videos: [],
                        old_images: [],
                        default_variant_id: '',
                        admin_graphql_api_id: '',
                        status: '',
                        inventory_management: true,
                        requires_shipping: true
                    };
                    this.metaData = {};
                    this.images = [];
                    this.videos = [];
                    this.display_videos = [];
                    this.old_images = [];
                    this.old_videos = [];
                    this.localUpdatedFields = this.getDefaultUpdatedFields();
                },
                async handleFormSubmission() {
                    try {
                        this.loading = true;
                        if (this.isEditProductsPage) {
                            await this.editProduct()
                        } else {
                            await this.addProduct()
                        }
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        this.showToast('Error while submitting form', 'failure');
                    } finally {
                        this.loading = false;
                    }

                },
                async addProduct() {
                    try {
                        this.loading = true;
                    
                        const formData = new FormData();
                        formData.append('title', this.productData.title);
                        formData.append('inventory_quantity', this.productData.quantity);
                        formData.append('price', this.productData.price);
                        formData.append('body_html', this.productData.description);
                        formData.append('length', this.productData.length);
                        formData.append('width', this.productData.width);
                        formData.append('height', this.productData.height);
                        formData.append('weight', this.productData.weight);
                        formData.append('weight_unit', this.userData && this.userData.default_shop && this.userData.default_shop.weight_unit);
                        formData.append('product_type', this.productData.category);
                        formData.append('shop_id', this.userData && this.userData.default_shop && this.userData.default_shop.id);
                        formData.append('vendor', this.userData && this.userData.company.title);
                        formData.append('images', JSON.stringify(this.images));
                        formData.append('videos' , JSON.stringify(this.productData.videos));
                        formData.append('meta_data', JSON.stringify({ ...this.metaData }));
                        formData.append('ignore_warnings', true);
                        formData.append('type', 'add_product');
                        formData.append('status', 'active');
                        formData.append('merchant_comments', this.productData.merchant_comments);
                        formData.append('requires_shipping', this.requiresShippingValue);
                        formData.append('rental_rule_id', this.productData.rental_rule_id || '');
                        formData.append('inventory_management', true);
                        const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            'Content-Type': 'multipart/form-data',
                        };

                        const response = await axios.post(
                            `${this.baseUrl}/v1/products/store-draft-product/vendor-product-save`,
                            formData,
                            { headers }
                        );
                        this.showToast('Product added successfully', 'success');
                        this.openPage('MyProducts');
                        this.fetchActiveProducts('productAdded');
                        this.fetchPendingApprovalProducts();


                    } catch (error) {
                        console.error('Error adding product:', error);
                        this.showToast('Error while adding product', 'failure');
                    } finally {
                        this.loading = false;
                        this.resetListingForm();
                    }
                },
                async deleteProduct(productType) {                        
                    try {
                        this.loading = true;

                        const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                        };

                        if (productType === 'pendingApproval') {
                            const params = new FormData();
                            params.set('query', JSON.stringify({
                                id: [this.deleteProductData.id]
                            }));
                            const response = await axios.post(
                                `${this.baseUrl}/v1/products/delete-draft-product`,
                                params,
                                { headers }
                            );
                            this.fetchPendingApprovalProducts();
                            this.closeDeletePendingApprovalProductModal();
                        } else {
                            const response = await axios.delete(
                                `${this.baseUrl}/v1/products/${this.deleteProductData.id}`,
                                { headers }
                                );
                            this.fetchActiveProducts('productDeleted');
                            this.closeDeleteModal();
                        }
                        this.showToast('Product deleted successfully', 'success');
                    } catch (error) {
                        console.error('Error deleting product:', error);
                        this.showToast('Error while deleting product', 'failure');
                    } finally {
                        this.loading = false;
                    }
                },
                async editProduct() {
                    try {
                        this.loading = true;
                        const formData = new FormData();
                        formData.append('title', this.productData.title);
                        formData.append('inventory_quantity', this.productData.quantity || null);
                        formData.append('price', this.productData.price || null);
                        formData.append('length', this.productData.length || null);
                        formData.append('width', this.productData.width || null);
                        formData.append('height', this.productData.height || null);
                        formData.append('weight', this.productData.weight || null);
                        formData.append('requires_shipping', this.requiresShippingValue);
                        formData.append('product_type', this.productData.category.label ? this.productData.category.label : this.productData.category);
                        formData.append('status', this.productData.status);
                        formData.append('rental_rule_id', this.productData.rental_rule_id || '');
                        formData.append('admin_graphql_api_id', this.productData.admin_graphql_api_id);
                        formData.append('default_variant_id', this.firstVariant ? this.firstVariant.id : this.productData.default_variant_id);
                        formData.append('shop_id', this.userData && this.userData.default_shop && this.userData.default_shop.id);
                        formData.append('vendor', this.userData && this.userData.company.title);
                        formData.append('body_html', this.productData.description);
                        formData.append('old_images', JSON.stringify(this.productData.old_images));
                        formData.append('old_videos', JSON.stringify(this.productData.old_videos));
                        formData.append('images', JSON.stringify(this.images));
                        formData.append('videos' , JSON.stringify(this.productData.videos));
                        formData.set('meta_data', JSON.stringify({ ...this.metaData }));
                        formData.set('merchant_comments', this.productData.merchant_comments);
                        formData.set(
                            'updated_fields',
                            JSON.stringify(this.localUpdatedFields),
                        );
                        formData.append('inventory_management', true);

                        if(this.firstVariant) {
                            formData.set('variants', JSON.stringify([this.firstVariant]));
                            formData.append('variants[0]', JSON.stringify(this.firstVariant));
                            formData.append('options', JSON.stringify(this.productData.options));
                            formData.append('options[0]', JSON.stringify(this.productData.options[0]));
                        }

                        formData.append('type', 'edit_product');

                        const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            'Content-Type': 'multipart/form-data', 
                        };

                        if (this.productType === 'pendingApproval') {
                            const response = await axios.post(
                                `${this.baseUrl}/v1/products/store-draft-product/${this.editProductId}`,
                                formData,
                                { headers }
                            );
                            this.firstVariant = null;
                            this.fetchPendingApprovalProducts();
                        } else {
                            const response = await axios.post(
                                `${this.baseUrl}/v1/products/store-edit-product/${this.editProductId}`,
                                formData,
                                { headers }
                            );
                            this.firstVariant = null;
                            this.fetchActiveProducts('productEdited');
                        }
                        this.showToast('Product edited successfully', 'success');
                        this.resetListingForm();
                        this.openPage('MyProducts');
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        if(error.response.data && error.response.data.warnings) {
                            this.showToast('Please enter price', 'failure');
                        }
                    } finally {
                        this.loading = false;
                    }
                },
                async openEditProduct(productData, productType, pageName) {
                    const searchParams = new URLSearchParams(window.location.search);
                    const productId = searchParams.get('id');
                    this.productType = productType;
                    this.editProductId = productData?.id || productId;
                    this.loading = true;

                    const headers = {'Authorization': `Bearer ${localStorage.getItem('stAuth')}`};

                    try {
                        await this.fetchBookingTypes();
                        if (productType === 'pendingApproval') {
                            const response = await axios.get(`${this.baseUrl}/v1/products/fetch-draft-product/${this.editProductId}`,{ headers });
                            let data = {...response.data.data.product_json, merchant_comments: response.data.data.merchant_comments};
                            this.setProductData(data);
                            await this.setCustomField();
                        } else {
                            const productResponse = await axios.get(`${this.baseUrl}/v1/products/fetch-product/${this.editProductId}`, { headers });
                            let data = {...productResponse.data.product_json, merchant_comments: productResponse.data.merchant_comments};
                            this.setProductData(data);
                            await this.setCustomField();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    } finally {
                        this.loading = false;
                    }
                },
                nextStep() {
                    this.$refs.wizard.next();
                },
                clearError(field) {
                    if (this.addEditProductErrors[field]) {
                        Vue.delete(this.addEditProductErrors, field);
                    }
                },
                validateStep(step) {
                    this.addEditProductErrors = {};

                    if (step === 1) {
                        this.validateStepOne();
                    }

                    if (step === 2) {
                        this.validateStepTwo();
                    }

                    if (step === 3) {
                        this.validateStepThree();
                    }

                    return Object.keys(this.addEditProductErrors).length === 0;
                },
                validateStepOne() {
                    const configurations = this.userData?.company?.configurations || {};

                    if (this.hasPermission('can_product_view_title')) {
                        if (!this.productData.title) {
                            this.addEditProductErrors['title'] = 'Title is required';
                        }
                    }

                    if (this.hasPermission('can_product_view_description')) {
                        if (
                            configurations.is_description_mandatory &&
                            !this.productData.description
                        ) {
                            this.addEditProductErrors['description'] =
                            'Description is required';
                        }
                    }

                    if (this.hasPermission('can_product_view_price')) {
                        if (configurations.is_price_mandatory) {
                            if (!this.productData.price || this.productData.price === 0) {
                            this.addEditProductErrors['price'] =
                                'Price must be greater than 0';
                            }
                        }
                    }

                    if (this.hasPermission('can_product_view_quantity')) {
                        if (configurations.is_quantity_mandatory) {
                            if (!this.productData.quantity && this.productData.quantity !== 0) {
                            this.addEditProductErrors['quantity'] = 'Quantity is required';
                            }
                        }
                    }

                    if (this.hasPermission('can_product_view_media')) {
                        if (configurations.is_media_mandatory) {
                            if (!this.images || this.images.length === 0) {
                            this.addEditProductErrors['image'] = 'Image is required';
                            }
                        }
                    }

                    return Object.keys(this.addEditProductErrors).length === 0;
                },
                validateStepTwo() {
                    if (!this.hasPermission('can_product_view_weight_dimension')) {
                        return true;
                    }

                    const configurations = this.userData?.company?.configurations || {};

                    if (!configurations.is_weight_dimension_mandatory) {
                        return true;
                    }

                    const dimensionFields = {
                        length: 'Length is required',
                        width: 'Width is required',
                        height: 'Height is required',
                        weight: 'Weight is required',
                    };

                    Object.entries(dimensionFields).forEach(([field, message]) => {
                        const value = this.firstVariant
                            ? this.firstVariant[field]
                            : this.productData[field];
                        if (!value && value !== 0) {
                            this.addEditProductErrors[field] = message;
                        }
                    });

                    return Object.keys(this.addEditProductErrors).length === 0;
                },
                validateStepThree() {
                    if (this.mandatoryCustomFields.length > 0) {
                        this.mandatoryCustomFields.forEach((element) => {
                            if (!this.metaData[element.name_slug]?.value) {
                                this.addEditProductErrors[element.name_slug] =
                                `${element.field_name} is required`;
                            }
                        });
                    }
                    return Object.keys(this.addEditProductErrors).length === 0;
                },
                validateCustomFields() {
                    for (const customField of this.userSelectedCustomFields) {
                        const value = this.metaData[customField.name_slug];
                        if (!value) {
                            this.addEditProductErrors[customField.name_slug] = `${customField.field_name} is required`;
                        }
                    }
                },
                validateProductDimensions() {
                    if (this.requiredFields['length'] && !this.productData['length']) {
                        this.addEditProductErrors['length'] = "Length is required";
                    }
                    if (this.requiredFields['width'] && !this.productData['width']) {
                        this.addEditProductErrors['width'] = "Width is required";
                    }
                    if (this.requiredFields['height'] && !this.productData['height']) {
                        this.addEditProductErrors['height'] = "Height is required";
                    }
                    if (this.requiredFields['weight'] && !this.productData['weight']) {
                        this.addEditProductErrors['weight'] = "Weight is required";
                    }
                },
                deleteImage(index) {
                    this.deletedImages.push(index);
                    this.imageUrls.splice(index, 1);
                },
                openDeleteProductModal (productData) {
                    this.$refs['deleteProductModal'].show();
                    this.deleteProductData = productData;
                },
                closeDeleteModal() {
                    this.$refs['deleteProductModal'].hide();
                },
                openDeletePendingApprovalProductModal (productData) {
                    this.$refs['deletePendingApprovalProductModal'].show();
                    this.deleteProductData = productData;
                },
                closeDeletePendingApprovalProductModal () {
                    this.$refs['deletePendingApprovalProductModal'].hide();
                    this.deleteProductData = null;
                },
                
                /* Orders */
                openOrdersTab(tabName, id) {
                    this.currentOrderTab = tabName;
                    let orderEndpoint = '';
                    const searchParams = new URLSearchParams(window.location.search);
                    const stPreview = searchParams.get('st_preview');
                    const isBackup = searchParams.get('is_backup');
        
                    if (tabName === 'AllOrders') {
                        const newUrl = this.buildDashboardUrl('Orders');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        this.current_orders_loading = 'All';
                        orderEndpoint = `${this.baseUrl}/v1/all-orders/fetchData?query=%7B%22type_of_order%22:%22forward+order%22%7D&limit=10&ascending=0&page=1&byColumn=1`;
                    } else if (tabName === 'New') {
                        const newUrl = this.buildDashboardUrl('New');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        this.current_orders_loading = 'New';
                        orderEndpoint = `${this.baseUrl}/v1/orders/fetchData?query=%7B%22type_of_order%22:%22forward+order%22%7D&limit=10&ascending=0&page=1&byColumn=1`;
                    } else if (tabName === 'Confirmed') {
                        const newUrl = this.buildDashboardUrl('Confirmed');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        
                        this.current_orders_loading = 'Confirmed';
                        orderEndpoint = `${this.baseUrl}/v1/confirmed-orders/fetchData?query=%7B%22type_of_order%22:%22forward+order%22%7D&limit=10&ascending=0&page=1&byColumn=1`;
                    }else if (tabName === 'In-transit') {
                        const newUrl = this.buildDashboardUrl('In-transit');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        
                        this.current_orders_loading = 'Intransit';
                        orderEndpoint = `${this.baseUrl}/v1/intransit-orders/fetchData?query=%7B%22type_of_order%22:%22forward+order%22%7D&limit=10&ascending=0&page=1&byColumn=1`;
                    }else if (tabName === 'Delivered') {
                        const newUrl = this.buildDashboardUrl('Delivered');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        
                        this.current_orders_loading = 'Delivered';
                        orderEndpoint = `${this.baseUrl}/v1/delivered-orders/fetchData?query=%7B%22type_of_order%22:%22forward+order%22%7D&limit=10&ascending=0&page=1&byColumn=1`;
                    }else if (tabName === 'Cancelled') {
                        const newUrl = this.buildDashboardUrl('Cancelled');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        
                        this.current_orders_loading = 'Cancelled';
                        orderEndpoint =`${this.baseUrl}/v1/cancelled-orders/fetchData?query=%7B%22type_of_order%22:%22forward+order%22%7D&limit=10&ascending=0&page=1&byColumn=1`;
                    }else if (tabName === 'Returned') {
                        const newUrl = this.buildDashboardUrl('Returned');
                        window.history.pushState({ path: newUrl }, '', newUrl);
                        
                        this.current_orders_loading = 'Returned';
                        orderEndpoint = `${this.baseUrl}/v1/all-orders/fetchData?query=%7B%22type_of_order%22:%22return+order%22%7D&limit=10&ascending=0&page=1&byColumn=1`;
                    } else if (tabName === 'OrderDetailsPage') {
                        const orderId = searchParams.get('id');
                        const newUrl = this.buildDashboardUrl('Orders', { id: id || orderId, isOrderDetails: true });
                        window.history.pushState({ path: newUrl }, '', newUrl);

                        this.fetchSingleOrder(id || orderId);
                        return;
                    }
                    this.fetchOrders(orderEndpoint);
                },
                async fetchOrders(endpoint) {
                    try {
                        this.orders_infinite_scroll_loading = true;
                        const response = await axios.get(endpoint, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            },
                        });
                        this.orders = response.data.data;
                        this.orders_infinite_scroll_loading = false;
                        this.current_orders_loading = null;
                        this.new_orders_loading = false;
                        this.confirmed_orders_loading = false;
                        this.in_transit_orders_loading = false;
                        this.delivered_orders_loading = false;
                        this.cancelled_orders_loading = false;
                        this.returned_orders_loading = false;
                    } catch (error) {
                        console.error('Error fetching orders:', error);
                    }
                },
                async fetchSingleOrder(id) {
                    try {
                        this.loading = true;
                        const response = await axios.get(`${this.baseUrl}/v1/orders/line-items/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            },
                        });
                        this.singleOrderData = response.data.data;
                        
                        const lineItems = this.singleOrderData.line_items;

                        if (lineItems && lineItems.length > 0) {
                            let totalBillableQuantity = 0;

                            lineItems.forEach(item => {
                                if (item.billable_quantity) {
                                totalBillableQuantity += item.billable_quantity;
                                }
                            });
                            this.totalBillableQuantity = totalBillableQuantity
                        }

                        this.loading = false;
                    } catch (error) {
                        console.error('Error fetching single order:', error);
                        this.loading = false;

                    }
                },
                


                /* Order Details Page */
                performOrderAction(orderId, action) {
                    this.order_status_change_loading = orderId;

                    let endpoint = null;
                    if  (action === 'confirmed') {
                        endpoint = `${this.baseUrl}/v1/orders/confirm-order`;
                    } else if (action === 'in-transit') {
                        endpoint = `${this.baseUrl}/v1/orders/intransit-order`;
                    } else if (action === 'delivered') {
                        endpoint = `${this.baseUrl}/v1/orders/mark-as-delivered`;
                    } else if (action === 'cancelled') {
                        endpoint = `${this.baseUrl}/v1/orders/cancel-order`;
                    } else if (action === 'returned') {
                        endpoint = `${this.baseUrl}/v1/orders/mark-as-returned`;
                    }else if (action === 'new-order') {
                        endpoint = `${this.baseUrl}/v1/orders/move-to-new-orders`;
                    }
                    
                    const headers = {
                        'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                    };
                    let params = new FormData();
                    params.set('vendorOrderId', orderId);

                    axios.post(endpoint, params, {headers})
                        .then(response => {
                            this.showToast(`Order ${action} successfully`, 'success');
                            this.fetchSingleOrder(orderId);;
                        })
                        .catch(error => {
                            console.error(`Error ${action}ing Order:`, error);
                        })
                        .finally(()=>{
                            this.order_status_change_loading = 0;
                        })
                },
                shipmentStatusChange(rowData, status) {
                    this.shipment_status_change_loading = rowData.id;
                    this.$refs.dropdown.hide();

                    let endpoint = null;

                    switch (status) {
                        case 'Pending':
                            endpoint = `${this.baseUrl}/v1/orders/update-pending-status`;
                            break;
                        case 'Label Created':
                            endpoint = `${this.baseUrl}/v1/orders/update-label-created-status`;
                            break;
                        case 'Intransit':
                            endpoint = `${this.baseUrl}/v1/orders/update-intransit-status`;
                            break;
                        case 'Out for Delivery':
                            endpoint = `${this.baseUrl}/v1/orders/update-out-for-delivery-status`;
                            break;
                        case 'Order Failed Attempt':
                            endpoint = `${this.baseUrl}/v1/orders/update-failed-attempt-status`;
                            break;
                        case 'Delivered':
                            endpoint = `${this.baseUrl}/v1/orders/update-delivered-status`;
                            break;
                        case 'Returning':
                            endpoint = `${this.baseUrl}/v1/orders/update-returning-status`;
                            break;
                        case 'Returned':
                            endpoint = `${this.baseUrl}/v1/orders/update-returned-status`;
                            break;
                        case 'Delivery Exception':
                            endpoint = `${this.baseUrl}/v1/orders/update-delivery-exception-status`;
                            break;
                        case 'Lost':
                            endpoint = `${this.baseUrl}/v1/orders/update-lost-status`;
                            break;
                        case 'Expired':
                            endpoint = `${this.baseUrl}/v1/orders/update-expired-status`;
                            break;
                        case 'Auto Tracking':
                            endpoint = `${this.baseUrl}/v1/orders/update-auto-tracking-status`;
                            break;
                        default:
                            console.error('Invalid status:', status);
                            break;
                    }

                    const headers = {
                        'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                    };

                    let params = new FormData();
                    params.set('vendorOrderId', rowData.id);
                    params.set('status_sequence', rowData.status_sequence);

                    axios.post(endpoint, params, { headers })
                        .then(response => {
                            this.showToast(`Status set to ${status} successfully`, 'success');

                        })
                        .catch(error => {
                            console.error(`Error setting status:`, error);
                            this.showToast('Error while setting status', 'failure');
                        })
                        .finally(() => {
                            this.shipment_status_change_loading = 0;
                        });
                },
                getShipmentStatusBadgeClass(trackingStatus) {
                    const statusMap = {
                        "New Order": "status-1",
                        "processing": "primary",
                        "Pending": "status-1",
                        "Label Created": "status-2",
                        "In Transit": "status-3",
                        "Out For Delivery": "status-4",
                        "Failed Attempt": "status-5",
                        "Delivered": "status-6",
                        "Returning": "status-7",
                        "Returned": "status-7",
                        "Delivery Exception": "status-8",
                        "Expired": "status-9",
                        "Auto Tracking U/A": "status-10"
                    };
                    return statusMap[trackingStatus] || 'secondary';
                },
                openAddTrackingModal () {
                    this.shippingCarrier = this.singleOrderData.shipping_provider;
                    this.trackingNumber = this.singleOrderData.awb;
                    this.trackingUrl = this.singleOrderData.tracking_link;
                
                    this.$refs.addTrackingModal.show();
                },
                closeAddTrackingModal () {
                    this.$refs.addTrackingModal.hide();
                },
                async saveTracking(orderId) {
                    try {
                        this.save_tracking_loading = true;
                    
                        const formData = new FormData();
                        formData.append('shipping_provider', this.shippingCarrier);
                        formData.append('awb_number', this.trackingNumber);
                        formData.append('tracking_link', this.trackingUrl);
                        formData.append('vendorOrderId', orderId);
                    
                        const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                            'Content-Type': 'multipart/form-data',
                        };

                        const response = await axios.post(
                            `${this.baseUrl}/v1/orders/custom-generate-label`,
                            formData,
                            { headers }
                        );

                        this.showToast('Tracking added successfully', 'success');
                        this.closeAddTrackingModal();
                        this.fetchSingleOrder(orderId);
                    } catch (error) {
                        console.error('Error adding product:', error);
                    } finally {
                        this.save_tracking_loading = false;
                    }
                },
                hideDropdown () {
                    this.$refs.dropdown.hide();
                },
                getOrderStatusBadgeClass(orderSequenceName) {
                    const colorMap = {
                        'New Orders': 'primary',
                        'Delivered': 'success',
                        'Confirmed': 'success',
                        'Held': 'warning',
                        'cancelled': 'danger',
                    };

                    return `${colorMap[orderSequenceName]}`;
                },
                handlePopState() {
                    const urlParams = new URLSearchParams(window.location.search);
                    const orderId = urlParams.get('id');
                    const pageName = urlParams.get('page');
                    if(orderId && pageName === 'OrderDetailsPage'){
                        this.openOrdersTab('OrderDetailsPage');
                    }
                    if(pageName === 'Orders' && !orderId) {
                        this.openOrdersTab('AllOrders');
                    } 
                },
                /*Barters */
                closeApproveBarterModal() {
                    this.$refs['approveBarterModal'].hide();
                },
                showBarterDetails(barter){
                    this.barterOfferDetails = barter;
                    this.$refs['barter-info'].show();
                },
                onSlideStart() {
                    this.sliding = true
                },
                onSlideEnd() {
                    this.sliding = false
                },
                 fetchMoreBartersOnscrollTrigger () {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                this.barterPageNumber += 1;
                                if (this.barterPageNumber <= this.totalBartersPages) {
                                    this.fetchBarters('infinite-scrolling')
                                } else {
                                    this.lastBarterPageShown = true;
                                    observer.unobserve(entry.target);
                                }
                            }
                        })
                    });

                    observer.observe(this.$refs.bartersIntersectionObeserverTarget)
                },
                async rejectBarter(){
                    try{
                        this.barterActionLoading = true;
                        const headers = this.getAuthHeaders();
                        const payload = {
                            draft_order_id : this.singleBarterData.draft_order_id,
                            approved_status : 'rejected',
                            rejection_reason : this.barterRejectionReason
                        };
                        const response = await axios.post(`${this.baseUrl}/v1/barter-draft-orders/rejectBarterDraftOrder`,payload, { headers });
                         this.showToast('Barter rejected successfully', 'success');
                        this.barterRejectionReason = null;
                        this.closeRejectionReasonModal();
                        this.fetchBarters();
                    }catch(err){
                        this.showToast('Error while rejecting barter', 'failure');
                    }finally{
                        this.barterActionLoading = false;
                    }
                },
                 async fetchBarters(type) {
                    if (type !== 'infinite-scrolling') {
                        this.resetBarters();
                    }
                    try {
                        this.bartersLoading = true;
                        const headers = this.getAuthHeaders();
                        const response = await axios.post(`${this.baseUrl}/v3/barter-draft-orders/fetch`,{}, { headers });
                        const { data } = response.data;
                        this.barters = type === 'infinite-scrolling' ? [...this.barters, ...data] : data;
                        this.bartersCount = response.data.recordsTotal;
                    } catch (error) {
                        this.showToast('Error while fetching barters', 'failure');
                        console.error('Error fetching barters:', error);
                    } finally {
                        this.bartersLoading = false;
                    }
                },
                 async approveBarter () {
                    try {
                        this.barterActionLoading = true;
                        const headers = this.getAuthHeaders();
                        const response = await axios.post(this.baseUrl + '/v1/barter-draft-orders/acceptBarterDraftOrder', { draft_order_id: this.singleBarterData.draft_order_id }, { headers });
                        this.showToast(response.data.message || 'Barter accepted successfully', 'success');
                        this.closeApproveBarterModal();
                        this.fetchBarters();
                        if (response.status === 200) {
                        } else {
                        }
                    } catch(error) {
                        console.error('Error accepting barter:', error.response.data.message);
                        this.showToast(error.response.data.message || 'Something Went Wrong', 'failure');
                    } finally {
                        this.barterActionLoading = false;

                    }
                },
                  confirmApproveBarter(data){
                    this.singleBarterData = data;
                    this.$refs['approveBarterModal'].show();
                  },
                  confirmRejectBarter(data) {
                    this.singleBarterData = data;
                    this.$refs['rejectionReasonModal'].show();
                },
                /* Offers */
                getOfferPrice (data) {
                    return data.total_price / this.getRequestedQuantity(data)
                },
                getRequestedQuantity (data) {
                    return data.line_items[0].quantity
                },
                getOfferOrderValue (data) {
                    return this.getOfferPrice(data) * this.getRequestedQuantity(data)
                },
                showCounterOfferModal (data) {
                    this.singleOfferData = data;
                    this.counterOfferQuantityChanged = false;
                    this.counterOfferPriceChanged = false;
                    this.counterOfferPrice = this.getOfferPrice(data);
                    this.counterOfferQuantity = this.getRequestedQuantity(data);
                    this.$refs['counterOffer'].show();
                },
                getCounterOfferPrice (data) {
                    return data.counter_offer_price
                },
                getCounterOfferQuantity (data) {
                    return data.counter_offer_quantity
                },
                getCounterOfferOrderValue (data) {
                    return this.getCounterOfferPrice(data) * this.getCounterOfferQuantity(data)
                },
                confirmApproveOffer(data) {
                    this.singleOfferData = data;
                    this.$refs['approveOfferModal'].show();
                },
                confirmRejectOffer(data) {
                    this.singleOfferData = data;
                    this.$refs['rejectionReasonModal'].show();
                },
                calculateOfferPricePercentage (data) {
                    try {
                        const percentage = ((this.getOfferPrice(data) / Number(data.line_items[0].price)) * 100) - 100;
                        return Math.round(percentage);
                    } catch (e) {
                        return ''
                    }
                },
                async counterOfferSubmit (payload) {
                    try {
                        this.offerActionLoading = true;
                        let payload = {
                            draft_order_id: this.singleOfferData.draft_order_id,
                            counter_offer_price: this.counterOfferPrice,
                            counter_offer_quantity: this.counterOfferQuantity
                        };
                        const headers = this.getAuthHeaders();
                        const response = await axios.post(this.baseUrl + '/v1/draft-orders/counterOfferDetails', payload, { headers });
                        if (response.status === 200) {
                            this.showToast('Offer counter offered successfully', 'success');
                            this.$refs['counterOffer'].hide();
                            this.fetchOffers();
                        } else {
                            this.showToast('Error while counter offering', 'failure');
                        }
                    } catch(error) {
                        console.error('Error counter offering:', error.message);
                        this.showToast('Error while counter offering', 'failure');
                    } finally {
                        this.offerActionLoading = false
                    }
                },
                closeApproveOfferModal () {
                    this.$refs['approveOfferModal'].hide()
                },
                async approve () {
                    try {
                        this.offerActionLoading = true;
                        const headers = this.getAuthHeaders();
                        const response = await axios.post(this.baseUrl + '/v1/draft-orders/acceptDraftOrder', { draft_order_id: this.singleOfferData.draft_order_id }, { headers });
                        if (response.status === 200) {
                            this.showToast('Offer accepted successfully', 'success');
                            this.closeApproveOfferModal();
                            this.fetchOffers();
                        } else {
                            this.showToast('Something Went Wrong', 'failure');
                        }
                    } catch(error) {
                        console.error('Error accepting offer:', error.message);
                        this.showToast('Something Went Wrong', 'failure');
                    } finally {
                        this.offerActionLoading = false;
                    }
                },
                closeRejectionReasonModal () {
                    this.$refs['rejectionReasonModal'].hide()
                },
                async reject () {
                    try {
                        this.offerActionLoading = true;
                        const headers = this.getAuthHeaders();
                    const response = await axios.post(this.baseUrl + '/v1/draft-orders/rejectDraftOrder', { draft_order_id: this.singleOfferData.draft_order_id, rejection_reason: this.rejectionReason }, { headers });
                    if (response.status === 200) {
                        this.showToast('Offer rejected successfully', 'success');
                        this.rejectionReason = null;
                        this.closeRejectionReasonModal();
                        this.fetchOffers();
                    } else {
                            this.showToast('Error while rejecting offer', 'failure');
                        }
                    } catch(error) {
                        console.error('Error rejecting offer:', error.message);
                        this.showToast('Error while rejecting offer', 'failure');
                    } finally {
                        this.offerActionLoading = false;
                    }
                },
                  resetBarters() {
                    this.lastBarterPageShown = false;
                    this.barterPageNumber = 1;
                    this.bartersCount = 0;
                    this.barters = [];
                },
                resetOffers() {
                    this.lastOffersPageShown = false;
                    this.offersPageNumber = 1;
                    this.offersCount = 0;
                    this.offers = [];
                },
                getOffersEndpoint() {
                    const params = new URLSearchParams({
                        query: '{}',
                        limit: this.offersPerPage,
                        ascending: 0,
                        page: this.offersPageNumber,
                        byColumn: 1
                    });
                    return `${this.baseUrl}/v1/orders/fetchDraftOrder?${params.toString()}`;
                },
                fetchMoreOffersOnscrollTrigger () {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                this.offersPageNumber += 1;
                                if (this.offersPageNumber <= this.totalOffersPages) {
                                    this.fetchOffers('infinite-scrolling')
                                } else {
                                    this.lastOffersPageShown = true;
                                    observer.unobserve(entry.target);
                                }
                            }
                        })
                    });

                    observer.observe(this.$refs.offersIntersectionObeserverTarget)
                },
                async fetchOffers(type) {
                    if (type !== 'infinite-scrolling') {
                        this.resetOffers();
                    }
                    try {
                        this.offersLoading = true;
                        const offersEndpoint = this.getOffersEndpoint();
                        const headers = this.getAuthHeaders();
                        const response = await axios.get(offersEndpoint, { headers });
                        const { data, count } = response.data;
                        this.offers = type === 'infinite-scrolling' ? [...this.offers, ...data] : data;
                        this.offersCount = count;
                    } catch (error) {
                        this.showToast('Error while fetching offers', 'failure');
                        console.error('Error fetching offers:', error);
                    } finally {
                        this.offersLoading = false;
                    }
                },

                /* Chats */
                chatsMobileViewFormatDate(date) {
                    const currentDate = new Date();
                    const inputDate = new Date(date);

                    const isToday = inputDate.toDateString() === currentDate.toDateString();
                    const isYesterday =
                        inputDate.getDate() === currentDate.getDate() - 1 &&
                        inputDate.getMonth() === currentDate.getMonth() &&
                        inputDate.getFullYear() === currentDate.getFullYear();

                    if (isToday) {
                        return new Intl.DateTimeFormat('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        }).format(inputDate);
                    } else if (isYesterday) {
                        return "Yesterday";
                    } else {
                        return new Intl.DateTimeFormat('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric'
                        }).format(inputDate);
                    }
                },
                resetChats() {
                    this.lastChatsPageShown = false;
                    this.chatsPageNumber = 1;
                },
                getChatsEndpoint() {
                    const params = new URLSearchParams({
                        query: '{}',
                        limit: this.chatsPerPage,
                        ascending: 0,
                        page: this.chatsPageNumber,
                        byColumn: 1
                    });
                    return `${this.baseUrl}/v1/company-queries/fetch?${params.toString()}`;
                },
                async fetchChats (type) {
                    if (type !== 'infinite-scrolling') {
                        this.resetChats();
                    }
                    const chatsEndpoint = this.getChatsEndpoint();
                    const headers = this.getAuthHeaders();

                    try {
                        this.chats_loading = true;
                        const response = await axios.get(chatsEndpoint, { headers });
                        
                        if (response.status === 200) {
                            const { data, count } = response.data;
                            this.chatsCount = 0;
                            this.chats = type !== 'infinite-scrolling' ? [] : this.chats;
                            this.chats = type === 'infinite-scrolling' ? [...this.chats, ...data] : data;
                            this.chatsCount = count;
                        } else {
                            this.showToast('Unexpected response from server', 'failure');
                            console.error(`Error: Received status ${response.status}`);
                        }
                    } catch (error) {
                        this.showToast('Error while fetching chats', 'failure');
                        console.error(error.message);
                    } finally {
                        this.chats_loading = false;
                    }
                },
                setSingleChatMessage (chatId) {
                    this.singleChatData = this.chats.find(chat => chat.id === chatId)
                },
                viewChatMessage (chatId) {
                    this.setSingleChatMessage(chatId);
                    this.$refs.viewChatMessage.show();
                },
                resetSingleChatData () {
                    this.singleChatData = {};
                },
                async submitReplyMessage() {
                    const submitReplyEndPoint = `${this.baseUrl}/v1/company-query-replies`;
                    const submitReplyData = {
                        message: this.replyMessage,
                        company_query_id: this.singleChatData.id
                    };
                    const headers = this.getAuthHeaders();

                    try {
                        this.submitReplyLoading = true;
                        const response = await axios.post(submitReplyEndPoint, submitReplyData, { headers });

                        if (response.status === 201) {
                            this.$refs.replyToChatMessage.hide();
                            this.resetChatReplies();
                        } else {
                            console.error(`Unexpected response status: ${response.status}`);
                            this.showToast('Failed to submit reply', 'failure');
                        }
                    } catch (error) {
                        console.error(error.message);
                        this.showToast('Something went wrong', 'failure');
                    } finally {
                        this.submitReplyLoading = false;
                    }
                },
                async fetchChatReplies (chatId) {
                    const repliesEndPoint = `${this.baseUrl}/v1/company-query-replies/${chatId}`;
                    const headers = this.getAuthHeaders();
                    try {
                        this.chatRepliesLoading = true;
                        const response = await axios.get(repliesEndPoint, { headers });
                        this.chatReplies = response.data.data;
                    } catch(error) {
                        console.error(error.message);
                        this.showToast('Error fetching chat replies', 'failure');
                    } finally {
                        this.chatRepliesLoading = false;
                    }
                },
                replyToChatMessage (chatId) {
                    this.setSingleChatMessage(chatId);
                    this.$refs.replyToChatMessage.show();
                    this.fetchChatReplies(chatId);
                },
                resetChatReplies () {
                    this.showReplyTextArea = false;
                    this.chatReplies = [];
                    this.resetSingleChatData();
                    this.fetchChats();
                },
                onSlideStart(slide) {
                    this.sliding = true;
                },
                onSlideEnd(slide) {
                    this.sliding = false;
                },
                fetchMoreChatsOnscrollTrigger () {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                this.chatsPageNumber += 1;
                                if (this.chatsPageNumber <= this.totalChatsPages) {
                                    this.fetchChats('infinite-scrolling')
                                } else {
                                    this.lastChatsPageShown = true;
                                    observer.unobserve(entry.target);
                                }
                            }
                        })
                    });

                    observer.observe(this.$refs.chatsIntersectionObeserverTarget)
                },
                async deleteMessage (chatData) {
                    let payload = {
                        query: {
                            id: chatData.id
                        }
                    };
                    let chatsEndpoint = `${this.baseUrl}/v1/delete-message`;
                    const headers = this.getAuthHeaders();
                    try {
                        this.chats_loading = true;
                        const response = await axios.post(chatsEndpoint, payload, { headers });
                        this.fetchChats();
                    } catch(error) {
                        console.error('Error deleting message:', error.message);
                        this.showToast('Error while deleting message', 'failure');
                    } finally {
                        this.chats_loading = false;
                    }
                },
                async updateMessageStatus(value) {
                    const chatsEndpoint = `${this.baseUrl}/v1/mark-as-resolved`;
                    const headers = this.getAuthHeaders();
                    try {
                        const response = await axios.post(chatsEndpoint, value, { headers });
                        return response.data;
                    } catch (error) {
                        console.error('Error while updating message status:', error.message);
                        this.showToast('Error while updating message status', 'failure');
                        throw error;
                    }
                },
                async updateTwoWayChatMessageStatus (id) {
                    const chatsEndpoint = `${this.baseUrl}/v1/chat/mark-as-resolved/${id}`;
                    const headers = this.getAuthHeaders();
                    try {
                        const response = await axios.post(chatsEndpoint, { headers });
                        return response.data;
                    } catch (error) {
                        console.error('Error while updating message status:', error.message);
                        this.showToast('Error while updating message status', 'failure');
                        throw error;
                    }
                },
                getPayloadForChatStatus(chatData) {
                    let newStatus;
                    if (chatData.status === 'replied' || chatData.status === 'pending') {
                        newStatus = 'resolved';
                    } else if (chatData.status === 'resolved') {
                        newStatus = 'replied';
                    }
                    return newStatus ? { query: { id: chatData.id, status: newStatus } } : null;
                },
                async updateStatus(chatData) {
                    try {
                        if (chatData.type === 'product') {
                            await this.updateTwoWayChatMessageStatus(chatData.id);
                        } else {
                            const payload = this.getPayloadForChatStatus(chatData);
                            if (payload) {
                                await this.updateMessageStatus(payload);
                            }
                        }
                        this.fetchChats();
                    } catch (error) {
                        console.error('Error updating status:', error.message);
                        this.showToast('Error while updating status', 'failure');
                    }
                },

                async openChatModal (chatData, type) {
                  this.singleChatData = chatData;
                  if (chatData.type === 'product') {
                    this.$refs['product-type-chat-modal'].show();
                  } else {
                    try {
                        this.isChatModalViewOnly = type === 'view';
                        this.$refs.chatModal.show();
                        this.chats_loading = true;
                        await this.fetchChatReplies(chatData.id)
                    } catch(error) {
                        console.error('Error fetching chat replies:', error.message);
                        this.showToast('Error while fetching chat replies', 'failure');
                    } finally {
                        this.chats_loading = false;
                    }
                  }
                },
                createFormData(data, fields) {
                    const formData = new FormData();
                    fields.forEach(field => {
                        if (field === 'company_query_id') {
                            formData.set('company_query_id', data['id']);
                        } else {
                            formData.set(field, data[field]);
                        }
                    });
                    return formData;
                },
                async storeProductLevelChatReply(payload) {
                    const endpoint = `${this.baseUrl}/v2/chats/store`;
                    const params = this.createFormData(payload, ['message', 'shopify_domain', 'product_id', 'customer_email', 'sender']);
                    
                    try {
                        const response = await axios.post(endpoint, params);
                        return response.data.data;
                    } catch (error) {
                        console.error('Error storing product-level chat reply:', error);
                        throw error;
                    }
                },
                async storeMessageData(value) {
                    const endpoint = `${this.baseUrl}/v1/company-query-replies`;
                    const params = this.createFormData(value, ['message', 'company_query_id', 'is_master']);
                    const headers = this.getAuthHeaders();

					try {
						const response = await axios.post(endpoint, params, { headers });
						this.$refs.chatModal.hide();
						return response.data.data;
					} catch (error) {
						console.error('Error storing message data:', error);
						this.showToast('Error storing message data', 'failure');
						throw error;
					}
				},
				async sendMessage() {
					if (!this.replyMessage.trim()) {
						this.showToast('Please enter a message', 'failure');
						return;
					}
					
					const isProductChat = this.singleChatData.type === 'product';
					const payload = isProductChat
						? {
							message: this.replyMessage,
							sender: 'vendor',
							customer_email: this.singleChatData.customer_email,
							product_id: this.singleChatData.product_id,
							shopify_domain: this.singleChatData.shopify_domain
						}
						: {
							message: this.replyMessage,
							id: this.singleChatData.id,
							is_master: null
						};

					this.chats_loading = true;
					this.disableSendBtn = true;

                    try {
                        if (isProductChat) {
                            await this.storeProductLevelChatReply(payload);
                            this.$refs['product-type-chat-modal'].hide();
                        } else {
                            await this.storeMessageData(payload);
                            this.$refs.chatModal.hide();
                        }

                        /* Reset the reply message and single chat data */
                        this.replyMessage = '';
                        this.fetchChats();
                    } catch (error) {
                        console.error('Error sending message:', error);
                        this.showToast('Something went wrong', 'failure');
                    } finally {
                        this.chats_loading = false;
                        this.disableSendBtn = false;
                    }
                },
                /* Profile */
                /* BIO */
                  updateOfferPickUpFromDefaultWarehouse(value){
                     const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                        };
                     let params = new FormData();
                     params.set('offer_pickup_from_default_warehouse', value);
                     params.set('company_id', this.userData.company_id);
                     axios.post(`${this.baseUrl}/v1/pickup_option_at_checkout`, params,{headers})
                        .then(response => {
                            if(value){
                                this.showToast('Local pickup enabled successfully', 'success');  
                            }else{
                                this.showToast('Local pickup disabled successfully', 'success');  
                            }
                            })
                            .catch(error => {
                            
                            }).finally(() => {

                            });
                },
                uploadCompanyLogo (e) {
                    this.editProfileData.logo_link = URL.createObjectURL(e.target.files[0]);
                    this.editProfileData.logo = e.target.files[0];
                },
                deleteCompanyLogo () {
                    this.editProfileData.logo_link = null;
                    this.editProfileData.logo = null;
                },
                createProfileFormData(data) {
                    const formData = new FormData();
                    const fields = [
                        'contact_name', 'phone_number', 'email', 'address_line_1', 
                        'address_line_2', 'city', 'pin_code', 'country', 'state_code', 
                        'twitter_link', 'facebook_link', 'instagram_link', 'tiktok_link', 
                        'about_us', 'logo'
                    ];

                    fields.forEach(field => {
                        if (data[field] !== undefined) {
                            formData.set(field, data[field]);
                        }
                    });

                    return formData;
                },
                async updateProfile() {
                    const headers = {
                        'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
                        'Content-Type': 'multipart/form-data',
                    };
                    this.submitLoading = true;

                    const params = this.createProfileFormData(this.editProfileData);

                    try {
                        const response = await axios.post(`${this.baseUrl}/v1/user/company`, params, { headers });
                        this.showToast('Profile updated successfully', 'success');
                    } catch (error) {
                        console.error('Error updating profile:', error);
                        this.showToast('Error updating profile', 'failure');
                    } finally {
                        this.submitLoading = false;
                    }
                },
                async editProfile() {
                    this.loading = true;
                    const headers = this.getAuthHeaders();

                    try {
                        const response = await axios.get(`${this.baseUrl}/v1/customer-to-customer/company`, { headers });
                        const data = response.data.data;
                        this.paypal_email = data.paypal_email;
                        if (data.country) {
                            await this.fetchStates(data.country);
                        }
                        Object.assign(this.editProfileData, {
                            contact_name: data.contact_name,
                            email: data.email,
                            phone_number: data.phone_number,
                            country: data.country,
                            state_code: data.state_code,
                            city: data.city,
                            address_line_1: data.address_line_1,
                            address_line_2: data.address_line_2,
                            pin_code: data.pin_code,
                            twitter_link: data.twitter_link,
                            facebook_link: data.facebook_link,
                            instagram_link: data.instagram_link,
                            tiktok_link: data.tiktok_link,
                            about_us: data.about_us,
                            logo_link: data.logo_link,
                            logo: data.logo
                        });
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    } finally {
                        this.loading = false;
                    }
                },
                /* Payment Method */
                savePaymentMethod () {
					this.submitLoading = true;
					const headers = {
						'Authorization': `Bearer ${localStorage.getItem('stAuth')}`,
					};

					const params = new FormData();

					params.set('provider', this.paymentMethod.provider);
					params.set('payment_method', this.paymentMethod.payment_method);
					params.set('bank_company_name', this.paymentMethod.bank_company_name);
					params.set('account_name', this.paymentMethod.account_name);
					params.set('account_number', this.paymentMethod.account_number);
					params.set('sort_code', this.paymentMethod.sort_code);
					params.set('nick_name', this.paymentMethod.nick_name);

					if(this.paymentMethod.id) {
						axios.put(`${this.baseUrl}/v1/payment-gateways/${this.paymentMethod.id}`, params, {headers})
						.then(res => {
                            this.showToast('Payment method updated successfully', 'success');
						}).finally(() => {
							this.submitLoading = false;
						})
					} else {
						axios.post(`${this.baseUrl}/v1/payment-gateways`, params, {headers})
						.then(res => {
						}).finally(() => {
							this.submitLoading = false;
						})
					}
				},
				async updatePaypalEmail () {
					let params = new FormData();
					params.set('paypal_email', this.paypal_email);
					params.set('slug', this.userData?.company?.slug);
					const headers = this.getAuthHeaders();
					try {
						await axios.post(`${this.baseUrl}/v1/update-paypal-email`, params, { headers });
						this.showToast('Success', 'success');
					} catch (error) {
						console.error('Error while setting paypal email:', error);
						this.showToast('Error while setting paypal email', 'failure');
					}
				},
				async connectVendorAccount (id) {
					try {
						const headers = this.getAuthHeaders();
						const response = await axios.get(`${this.baseUrl}/v1/payment-gateways/connect-vendor-account/${id}?marketplace=c2c&domain=${window.location.host}`, { headers });
						const data = response.data.response;
						data.forEach((res, index) => {
							if (res && 'stripeEnabled' in res) {
								this.stripe_enabled = res.stripeEnabled;
								this.vendorAccountDetails = res.data;
								this.stripeErrorMessage = res.message;
							} else if (res && 'paypalEnabled' in res) {
								this.paypal_enabled = res.paypalEnabled;
							}
						});
						return data;
					} catch (error) {
						console.error('Error fetching vendor account details:', error);
					}
				},
				async getPaymentMethodDetails() {
					this.loading = true;
					const headers = this.getAuthHeaders();

					try {
						await this.connectVendorAccount(this.userData?.company_id);
						const response = await axios.get(`${this.baseUrl}/v1/payment-gateways`, { headers });
						const [data] = response.data.data;

						if (data && data.manual_payment_gateway) {
							const {
								id,
								provider_name: provider,
								manual_payment_gateway: {
									payment_method,
									nick_name,
									account_name,
									account_number,
									sort_code,
									bank_company_name
								}
							} = data;

							Object.assign(this.paymentMethod, {
								id,
								provider,
								payment_method,
								nick_name,
								account_name,
								account_number,
								sort_code,
								bank_company_name
							});
						}

					} catch (error) {
						console.error('Error fetching payment method details:', error);
					} finally {
						this.loading = false;
					}
				},
                /* Booking -> IMPORTANT: PLEASE DO NOT EDIT THIS SECTION */
                to24HourFormat(time12h) {
                    const [time, modifier] = time12h.split(' ');
                    let [hours, minutes] = time.split(':').map(Number);
                    
                    if (modifier.toLowerCase() === 'pm' && hours !== 12) {
                        hours += 12;
                    } else if (modifier.toLowerCase() === 'am' && hours === 12) {
                        hours = 0;
                    }
                    
                    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
                },
                to12HourFormat(time24h) {
                    let [hours, minutes] = time24h.split(':').map(Number);
                    const modifier = hours >= 12 ? 'pm' : 'am';

                    hours = hours % 12 || 12;

                    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${modifier}`;
                },
                
                convert24HourFormatBookingType() {
                    if(this.formBookingType.available_date_range.start_time){
                        this.formBookingType.available_date_range.start_time = this.to24HourFormat(this.formBookingType.available_date_range.start_time);};
                    if(this.formBookingType.available_date_range.start_time){
                        this.formBookingType.available_date_range.end_time = this.to24HourFormat(this.formBookingType.available_date_range.end_time);};
                    
                    for (const [day, schedule] of Object.entries(this.formBookingType.operating_hours)) {
                        if (schedule.from) schedule.from = this.to24HourFormat(schedule.from);
                        if (schedule.to) schedule.to = this.to24HourFormat(schedule.to);
                    };
                },
                convert12HourFormatBookingType() {
                    if (this.formBookingType.available_date_range.start_time) {
                        this.formBookingType.available_date_range.start_time = this.to12HourFormat(this.formBookingType.available_date_range.start_time);
                    }
                    if (this.formBookingType.available_date_range.end_time) {
                        this.formBookingType.available_date_range.end_time = this.to12HourFormat(this.formBookingType.available_date_range.end_time);
                    }
                
                    for (const [day, schedule] of Object.entries(this.formBookingType.operating_hours)) {
                        if (schedule.from) schedule.from = this.to12HourFormat(schedule.from);
                        if (schedule.to) schedule.to = this.to12HourFormat(schedule.to);
                    }
                },
                async openEditBookingType (bookingTypeId) {
                    const EditBookingTypeEndpoint = `${this.baseUrl}/v1/products-rental-booking-rules/${bookingTypeId}`;
                    const headers = this.getAuthHeaders();
                    try {
                        const response = await axios.get(EditBookingTypeEndpoint, { headers });
                        this.formBookingType = response.data;
                        this.convert24HourFormatBookingType();
                    } catch (error) {
                        console.error('Error fetching auction products:', error);
                    } finally {
                    this.isEditAddBookingType= true;
                    this.isForAddBookingType= false;
                    };
                },
                openAddBookingType () {
                    this.formBookingType= {
                        rule_name: null,
                        booking_type: 'rental',
                        maximum_quantity: null,
                        fixed_booking_time_duration: {
                            time: null,
                            format: 'Hour',
                        },
                        lag_time: {
                            time: null,
                            format: 'Minutes',
                        },
                        available_date_range: {
                            count: 'Days',
                            start_time: '06:00:00',
                            end_time: '06:00:00',
                        },
                        date_picker: {
                            cutoff_days: {
                                time: null,
                                format: 'Days',
                            },
                            future_days: null,
                        },
                        operating_hours: {
                            Sunday: { from: null, to: null, slot_status: false },
                            Monday: { from: null, to: null, slot_status: false },
                            Tuesday: { from: null, to: null, slot_status: false },
                            Wednesday: { from: null, to: null, slot_status: false },
                            Thursday: { from: null, to: null, slot_status: false },
                            Friday: { from: null, to: null, slot_status: false },
                            Saturday: { from: null, to: null, slot_status: false },
                        },
                    };
                    this.isForAddBookingType= true;
                },
                getBookingEndpoint() {
                    const queryObjBookingType = this.searchQueryBookingType
                    ? { search: this.searchQueryBookingType }
                    : {};
                    const params = new URLSearchParams({
                        query: JSON.stringify(queryObjBookingType),
                        limit: this.perPageBookingType,
                        ascending: 0,
                        page: this.pageBookingType,
                        byColumn: 1,
                    });
                    return `${this.baseUrl}/v1/fetchAllRules/${this.userData.company_id}?${params.toString()}`;
                },
                
                
                async fetchBooking() {
                
                    const bookingEndpoint = this.getBookingEndpoint();
                    const headers = this.getAuthHeaders();
                    try {
                        const headers = this.getAuthHeaders();
                        const response = await axios.get(bookingEndpoint, { headers });
                        this.bookingdata = response.data.data;
                        this.totalPagesBookingType = Math.ceil(response.data.count / this.perPageBookingType);
                    } catch (error) {
                        console.error('Error fetching auction products:', error);
                    } finally {
                    };
                },
                changePageBookingType(p) {
                    this.pageBookingType = p;
                    this.fetchBooking();
                },
        
                handleSearchBookingType() {
                    this.pageBookingType = 1;
                    this.fetchBooking();
                },
                changePageBookingType(p) {
                    this.pageBookingType = p;
                    this.fetchBooking();
                },
                goToFirstBookingType() {
                    this.pageBookingType = 1;
                    this.fetchBooking();
                },
                goToPrevBookingType() {
                    if (this.pageBookingType > 1) {
                        this.pageBookingType--;
                        this.fetchBooking();
                    }
                },
                goToNextBookingType() {
                    if (this.pageBookingType < this.totalPagesBookingType) {
                        this.pageBookingType++;
                        this.fetchBooking();
                    }
                },
                goToLastBookingType() {
                    this.pageBookingType = this.totalPagesBookingType;
                    this.fetchBooking();
                },
                formatDateTime(datetime) {
                    if (!datetime) return 'NA';
                    const date = new Date(datetime);
                    return date.toLocaleString();
                },
                async deleteBookingType (bookingTypeId) {
                    const deleteBookingTypeEndpoint = `${this.baseUrl}/v1/products-rental-booking-rules/${bookingTypeId}`;
                    const headers = this.getAuthHeaders();
                    try {
                        await axios.delete(deleteBookingTypeEndpoint, { headers });
                        this.fetchBooking();
                        this.showToast('Booking rule deleted successfully.', 'success');
                    } catch (error) {
                        this.showToast('Error: Could not delete the booking rule.', 'error');
                    } finally {
                    };
                },
                async inactiveBookingType(bookingPayload) {
                    const inactiveBookingTypeEndpoint = `${this.baseUrl}/v1/rule-status-change`;
                    const headers = this.getAuthHeaders();
                    try {
                        await axios.post(inactiveBookingTypeEndpoint, bookingPayload, { headers });
                        this.fetchBooking();
                        this.showToast('Booking rule inactivated successfully.', 'success');
                    } catch (error) {
                        this.showToast('Failed to inactivate booking rule. Please try again.', 'error');
                    } finally {
                    };
                },
                async activeBookingType(bookingPayload) {
                    const activeBookingTypeEndpoint = `${this.baseUrl}/v1/rule-status-change`;
                    const headers = this.getAuthHeaders();
                    try {
                        await axios.post(activeBookingTypeEndpoint, bookingPayload, { headers });
                        this.fetchBooking();
                        this.showToast('Booking rule activated successfully.', 'success');
                    } catch (error) {
                        this.showToast('Failed to activate booking rule. Please try again.', 'error');
                    } finally {
                    };
                },
                async updateBookingType() {
                    if (!this.validateCutoffDaysBookingType || !this.validateFutureDaysBookingType) {
                        alert('Please fix the validation errors before updating.');
                        return;
                    }
                    this.isUpdatingBookingType = true;
                    this.convert12HourFormatBookingType();
                    const saveBookingTypeEndpoint = `${this.baseUrl}/v1/products-rental-booking-rules/${this.formBookingType.id}`;
                    const headers = this.getAuthHeaders();
                    
                    try {
                        await axios.put(saveBookingTypeEndpoint, this.formBookingType, { headers });
                        this.openPage('Booking');
                        this.fetchBooking();
                        this.showToast('Booking rule updated successfully', 'success');
                    } catch (error) {
                        this.showToast('Error: Could not update the booking rule', 'error');
                    } finally {
                        this.isUpdatingBookingType = false;
                        this.isEditAddBookingType = false;
                    }
                },
                async saveBookingType() {
                    if (!this.validateCutoffDaysBookingType || !this.validateFutureDaysBookingType) {
                        alert('Please fix the validation errors before saving.');
                        return;
                    }
                        this.convert12HourFormatBookingType();
                    this.isSavingBookingType = true;
                    const saveBookingTypeEndpoint = `${this.baseUrl}/v1/products-rental-booking-rules`;
                    const headers = this.getAuthHeaders();
                    
                    try {
                        await axios.post(saveBookingTypeEndpoint, this.formBookingType, { headers });
                        this.openPage('Booking');
                        this.fetchBooking();
                        this.showToast('New booking rule has been added', 'success');
                    } catch (error) {
                        this.showToast('Error: Could not create the booking rule', 'error');
                    } finally {
                        this.isSavingBookingType = false;
                        this.isEditAddBookingType = false;
                    }
                },
                
            },
            beforeDestroy() {
                /* Remove the event listener to avoid memory leaks */
                window.removeEventListener('popstate', this.handlePopState);
            },


            /* IMPORTANT: DO NOT EDIT THIS UNLESS YOU KNOW WHAT YOU'RE DOING */
            async mounted() {
                if (localStorage.getItem('c2c_access_attempt')) {
                    localStorage.removeItem('c2c_access_attempt')
                }

                if (ShopifyAnalytics.meta.page.customerId) {
                    this.fetchCountries();
                    const data = await this.setAuthToken();
                    if (data[0].accessToken) {
                        await this.setupUserDataAndPermissions();
                    }
                    
                    const searchParams = new URLSearchParams(window.location.search);
                    const page = searchParams.get('page');
                    if (page) {
                        this.activeTab = this.pageNames.indexOf(page);
                        const isOnPageReload = true;
                        this.openPage(page, null, null, isOnPageReload);
                    } else {
                        this.openPage('MyProducts');
                    }
                }
                window.addEventListener('popstate', this.handlePopState);
            },


            /* IMPORTANT: DO NOT EDIT THIS UNLESS YOU KNOW WHAT YOU'RE DOING */
            created() {
                const shopLang = Shopify.locale;
                if (this.translations[shopLang]) {
                    this.currentLanguage = this.translations[shopLang];
                } else {
                    this.currentLanguage = this.translations['en'];
                }

                const loadingIcon = document.getElementById('loading');
                const app = document.getElementById('app');
                loadingIcon.style.display = 'none';
                app.style.display = 'block';
            },
            
            /* Watchers */
            watch: {
                'productData.requires_shipping': {
        handler(newVal) {
          this.initializeCustomFields(newVal);
        },
      },
                customFields (_, __) {
                    this.addUserSelectedCustomFields()
                },
                activeProductsCount (count, __) {
                    if (count > this.itemsPerPage) {
                        this.$nextTick(() => {
                            this.fetchMoreProductsOnscrollTrigger()
                        })
                    }
                },
                chatsCount (count, __) {
                    if (count > this.chatsPerPage) {
                        this.$nextTick(() => {
                            this.fetchMoreChatsOnscrollTrigger()
                        })
                    }
                },
                offersCount (count, oldCount) {
                    if (count > this.offersPerPage) {
                        this.$nextTick(() => {
                            this.fetchMoreOffersOnscrollTrigger()
                        })
                    }
                },
                 bartersCount (count, oldCount) {
                    if (count > this.bartersPerPage) {
                        this.$nextTick(() => {
                            this.fetchMoreBartersOnscrollTrigger()
                        })
                    }
                },
                counterOfferQuantity: {
                    handler (newVal) {
                        this.counterOfferQuantityChanged = newVal !== this.singleOfferData.line_items[0].quantity
                    },
                    immediate: false,
                    deep: true
                },
                counterOfferPrice (newVal) {
                    this.counterOfferPriceChanged = newVal !== this.getOfferPrice(this.singleOfferData)
                }
            },
            computed:{
                currencySymbol() {
                    return this.userData?.default_shop?.currency_country?.currency_symbol || this.userData?.default_shop?.currency || '';
                },
                /*Booking Page*/
                validateCutoffDaysBookingType() {
                    return (
                        this.formBookingType.date_picker.cutoff_days.time === null ||
                        this.formBookingType.date_picker.cutoff_days.time >= 0
                    );
                },
                validateFutureDaysBookingType() {
                    return (
                        this.formBookingType.date_picker.future_days === null ||
                        (this.formBookingType.date_picker.future_days >= 0 &&
                        this.formBookingType.date_picker.future_days >=
                            (this.formBookingType.date_picker.cutoff_days.time || 0))
                    );
                },
                visiblePagesBookingType() {
                    const pages = [];
                    const start = this.pageBookingType - this.pageBookingType%10 +1;
                    const end = Math.min(start + 9, this.totalPagesBookingType);
                    for (let i = start; i <= end; i++) {
                    pages.push(i);
                    };
                    return pages;
                },
                plainMerchantComments () {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = this.productData.merchant_comments || "";
                    return tempDiv.textContent || tempDiv.innerText || "";
                },
                getModalTitle() {
                    return this.pickupAction === 'addNewWarehouse' ? 'Add Pickup Address' : 'Edit Pickup Address';
                },
                isMobile() {
                    return window.innerWidth <= 820;
                },          
                totalActiveProductsPages () {
                    if (this.activeProductsCount == 0) {
                        return 0;
                    }
                    const totalPages = Math.ceil(this.activeProductsCount / this.itemsPerPage);
                    return totalPages;
                },
                totalChatsPages () {
                    if (this.chatsCount === 0) return 0;
                    const totalPages = Math.ceil(this.chatsCount / this.chatsPerPage);
                    return totalPages;
                },
                  totalBartersPages () {
                    if (this.bartersCount === 0) return 0;
                    const totalPages = Math.ceil(this.bartersCount / this.bartersPerPage);
                    return totalPages;
                },
                totalOffersPages () {
                    if (this.offersCount === 0) return 0;
                    const totalPages = Math.ceil(this.offersCount / this.offersPerPage);
                    return totalPages;
                },
                storeSellsOnlyDigitalProduct () {
                    return this.userData.default_shop.product_types_sold_on_store === 'digital_products_only'
                },
                storeSellsOnlyPhysicalProduct () {
                    return this.userData.default_shop.product_types_sold_on_store === 'physical_products_only'
                },
                requiresShippingValue () {
                    if (this.storeSellsOnlyDigitalProduct) {
                      return false
                    } else if (this.storeSellsOnlyPhysicalProduct) {
                      return true
                    }
                  return this.productData.requires_shipping;
                },
                /* Chats */
                formattedDate () {
                  if (this.singleChatData.created_at) {
                    return new Date(this.singleChatData.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(',', '')
                  } else return ''
                }
            },
            delimiters: ['%%', '%%']
        });
    };
</script>