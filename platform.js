/**
 * Waqf Platform V2 - Core Logic
 * Handles Assets, Units, Contracts, and Payments
 */

// 1. DATA STRUCTURES
const ASSETS = [
    {
        id: 'AST-992201', name: 'عمارة اليرموك الاستثمارية', type: 'مبنى تجاري سكني', city: 'الرياض',
        district: 'اليرموك', area: '1,500', unitsCount: '24', status: 'مكتمل',
        addedBy: 'فهد المطيري', addedDate: '2022/10/01', notes: 'العمارة تقع على زاوية طريق رئيسي'
    },
    {
        id: 'AST-450012', name: 'مركز النور التجاري', type: 'مجمع تجاري', city: 'جدة',
        district: 'الزهراء', area: '5,200', unitsCount: '45', status: 'مكتمل',
        addedBy: 'سليمان الحميد', addedDate: '2021/05/20', notes: 'يحتوي على مواقف سيارات قبو ودورين'
    }
];

const UNITS = [
    {
        id: 'UNT-8812', yardi: 'Y-0012', asset: 'AST-992201', unified: '8812-UNI-01', type: 'سكني',
        status: 'مؤجرة', floor: '1', area: '120.50', mainUse: 'سكني', subUse: 'سكن عوائل',
        lastVacateH: '1445/05/10', lastVacateM: '2023/11/24', electric: '99002231', water: '110022',
        estRent: '45,000', affected: 'لا', notes: 'الوحدة مجددة بالكامل', unitState: 'نشط',
        addedDate: '2023/01/15', addedBy: 'علي الغامدي', modifiedDate: '2024/02/10', modifiedBy: 'سليمان الحميد'
    },
    {
        id: 'UNT-1020', yardi: 'Y-1020', asset: 'AST-450012', unified: '1020-UNI-05', type: 'تجاري',
        status: 'شاغرة', floor: '0', area: '200.00', mainUse: 'تجاري', subUse: 'محل تجزئة',
        lastVacateH: '1446/02/10', lastVacateM: '2024/08/10', electric: '880011', water: '220033',
        estRent: '180,000', affected: 'لا', notes: 'موقع مميز على الواجهة', unitState: 'نشط',
        addedDate: '2021/05/25', addedBy: 'سليمان الحميد', modifiedDate: '2024/08/12', modifiedBy: 'نواف العنزي'
    }
];

const CONTRACTS = [
    {
        id: 'CON-5001', yardi: 'CY-5001', unitYardi: 'Y-0012', ejar: '9900881', tenant: 'محمد صالح الشمري',
        idType: 'هوية وطنية', idNum: '100229331', startH: '1445/03/01', startM: '2023/09/15',
        endH: '1446/03/01', endM: '2024/09/15', annualRent: '45,000', totalValue: '45,000',
        payMethod: 'نصف سنوي', status: 'نشط', insurance: '2,000', dispute: 'لا', state: 'نشط',
        addedBy: 'سارة خالد', addedDate: '2023/09/10', modifiedBy: 'نواف العنزي', modifiedDate: '2024/02/01'
    }
];

const PAYMENTS = [
    {
        id: 'PAY-1001', conYardi: 'CY-5001', unitYardi: 'Y-0012', num: '1',
        dueH: '1445/03/01', dueM: '2023/09/15', status: 'سداد كلي', currency: 'ريال',
        amount: '22,500', paid: '22,500', paidDateH: '1445/02/29', paidDateM: '2023/09/14',
        notes: 'سداد عبر تحويل بنكي مباشر - البنك الأهلي', addedBy: 'نواف العتيبي', addedDate: '2023/09/10',
        modifiedBy: 'سليمان الحميد', modifiedDate: '2023/09/14'
    }
];

// --- PROJECT MANAGEMENT DATA ---

const PM_AGREEMENTS = [
    {
        id: 'AGR-7701', num: '2024/001', name: 'اتفاقية الصيانة التشغيلية الشاملة', type: 'خدمات هندسية',
        status: 'قيد التنفيذ', startH: '1445/06/01', startM: '2024/01/12', endH: '1446/06/01', endM: '2025/01/12',
        budget: '2,500,000', approvalNum: 'PUR-99220', ceiling: '5,000,000', addedBy: 'علي الغامدي', addedDate: '2024/01/01',
        modifiedBy: 'سارة خالد', modifiedDate: '2024/02/15'
    }
];

const PM_SERVICES = [
    {
        id: 'SRV-101', agrId: 'AGR-7701', providerId: 'PRV-505', service: 'رفع مساحي',
        unit: 'بالمتر', price: '15.00', status: 'نشط', addedBy: 'نواف العنزي', addedDate: '2024/01/15'
    }
];

const PM_PROJECTS = [
    {
        id: 'PRJ-1001', num: 'P-2024-88', name: 'ترميم عمارة العليا - المرحلة الأولى', status: 'قيد التنفيذ',
        budget: '450,000', manager: 'م. فهد القرني', startH: '1445/09/01', startM: '2024/03/12',
        endH: '1446/03/01', endM: '2024/09/12', completion: 45, prjType: 'ترميم وصيانة',
        siteName: 'عمارة العليا السكنية', contractor: 'شركة الخليج للمقاولات'
    }
];

const PM_WORK_ORDERS = [
    {
        id: 'WO-5512', prjId: 'PRJ-1001', num: 'WO-001', name: 'أعمال الدهانات الخارجية',
        status: 'قيد التنفيذ', priority: 'عالية', estCost: '55,000', supervisor: 'م. أحمد سعيد',
        startM: '2024/04/01', endM: '2024/05/01', contractor: 'مؤسسة إعمار', woType: 'تكميلي'
    }
];

const PM_VALUATIONS = [
    {
        id: 'VAL-9901', assetId: 'AST-992201', evaluator: 'شركة تثمين العقارية', approved: 'نعم',
        landVal: '12,000,000', buildingSale: '8,000,000', buildingRent: '1,200,000',
        totalVal: '20,000,000', date: '2024/01/10', notes: 'التقييم يشمل القيمة السوقية الحالية',
        addedBy: 'سارة خالد', addedDate: '2024/01/12'
    }
];

const PM_PROVIDERS = [
    {
        id: 'PRV-505', num: 'P-005', type: 'مكتب هندسي', name: 'دار الهندسة للاستشارات',
        license: '101002233', category: 'أ', licenseStatus: 'ساري', licenseEnd: '2026/05/10',
        crNum: '1010556677', mobile: '0505544332', rating: 4.5, addedBy: 'نظام', addedDate: '2021/01/01'
    }
];

// 2. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    showView('assets'); // Load Assets by default
});

function initNavigation() {
    const links = {
        // Endowment
        'menu-founder': 'founder',
        'menu-supervisor': 'supervisor',
        'menu-endowment-asset': 'endowment-asset',
        // Assets
        'menu-assets': 'assets',
        'menu-units-group': 'units-group',
        // Units
        'menu-units': 'units',
        'menu-contracts': 'contracts',
        'menu-payments': 'payments',
        // GIS
        'menu-gis-visit': 'gis-visit',
        'menu-gis-exprop': 'gis-exprop',
        'menu-gis-assets': 'gis-assets',
        'menu-gis-litigation': 'gis-litigation',
        // PM
        'menu-pm-projects': 'pm-projects',
        'menu-pm-workorders': 'pm-workorders',
        'menu-pm-agreements': 'pm-agreements',
        'menu-pm-services': 'pm-services',
        'menu-pm-reports': 'pm-reports',
        'menu-pm-valuations': 'pm-valuations',
        'menu-pm-providers': 'pm-providers'
    };

    Object.entries(links).forEach(([id, view]) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                showView(view);
            });
        }
    });

    // Initialize Toast Container
    if (!document.getElementById('toast-container')) {
        const toastCont = document.createElement('div');
        toastCont.id = 'toast-container';
        toastCont.className = 'toast-container';
        document.body.appendChild(toastCont);
    }
}

// 3. VIEW CONTROLLER
function showView(viewName, filterId = null) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const breadcrumb = document.getElementById('platform-breadcrumb');

    // Helper to activate link
    const activate = (id) => {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    };

    if (viewName === 'founder') {
        activate('menu-founder');
        breadcrumb.innerHTML = '<a href="#">الوقف</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">بيانات الواقف</span>';
        renderFounder();
    }
    else if (viewName === 'supervisor') {
        activate('menu-supervisor');
        breadcrumb.innerHTML = '<a href="#">الوقف</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">بيانات الناظر</span>';
        renderSupervisor();
    }
    else if (viewName === 'endowment-asset') {
        activate('menu-endowment-asset');
        breadcrumb.innerHTML = '<a href="#">الوقف</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">الأصل (الوقف)</span>';
        renderEndowmentDetails();
    }
    else if (viewName === 'assets') {
        activate('menu-assets');
        breadcrumb.innerHTML = '<a href="#">الأصول</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">سجل الأصول</span>';
        renderAssets();
    }
    else if (viewName === 'units-group') {
        activate('menu-units-group');
        breadcrumb.innerHTML = '<a href="#">الأصول</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">إدارة الوحدات</span>';
        renderUnits();
    }
    else if (viewName === 'units') {
        activate('menu-units');
        breadcrumb.innerHTML = '<a href="#">الوحدات</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">قائمة الوحدات</span>';
        renderUnits(filterId);
    }
    else if (viewName === 'contracts') {
        activate('menu-contracts');
        breadcrumb.innerHTML = '<a href="#">الوحدات</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">عقود الإيجار</span>';
        renderContracts(filterId);
    }
    else if (viewName === 'payments') {
        activate('menu-payments');
        breadcrumb.innerHTML = '<a href="#">الوحدات</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">دفعات الإيجار</span>';
        renderPayments(filterId);
    }
    // GIS VIEWS
    else if (viewName === 'gis-visit') {
        activate('menu-gis-visit');
        breadcrumb.innerHTML = '<a href="#">المعلومات الجغرافية</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">تقرير الزيارة</span>';
        renderTechnicalReport(); // Reusing the large form
    }
    else if (viewName === 'gis-exprop') {
        activate('menu-gis-exprop');
        breadcrumb.innerHTML = '<a href="#">المعلومات الجغرافية</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">مشروع النزع</span>';
        renderTechnicalReport();
    }
    else if (viewName === 'gis-assets') {
        activate('menu-gis-assets');
        breadcrumb.innerHTML = '<a href="#">المعلومات الجغرافية</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">أصول النزع</span>';
        renderAssets();
    }
    else if (viewName === 'gis-litigation') {
        activate('menu-gis-litigation');
        breadcrumb.innerHTML = '<a href="#">المعلومات الجغرافية</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">القضايا</span>';
        renderTechnicalReport();
    }
    // PROJECT MANAGEMENT VIEWS
    else if (viewName === 'pm-projects') {
        activate('menu-pm-projects');
        breadcrumb.innerHTML = '<a href="#">إدارة المشاريع</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">المشاريع</span>';
        renderProjects();
    }
    else if (viewName === 'pm-workorders') {
        activate('menu-pm-workorders');
        breadcrumb.innerHTML = '<a href="#">إدارة المشاريع</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">أوامر العمل</span>';
        renderWorkOrders();
    }
    else if (viewName === 'pm-agreements') {
        activate('menu-pm-agreements');
        breadcrumb.innerHTML = '<a href="#">إدارة المشاريع</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">الاتفاقيات الإطارية</span>';
        renderAgreements();
    }
    else if (viewName === 'pm-services') {
        activate('menu-pm-services');
        breadcrumb.innerHTML = '<a href="#">إدارة المشاريع</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">خدمات الاتفاقيات</span>';
        renderAgreementServices();
    }
    else if (viewName === 'pm-reports') {
        activate('menu-pm-reports');
        breadcrumb.innerHTML = '<a href="#">إدارة المشاريع</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">التقرير الفني</span>';
        renderTechnicalReport();
    }
    else if (viewName === 'pm-valuations') {
        activate('menu-pm-valuations');
        breadcrumb.innerHTML = '<a href="#">إدارة المشاريع</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">التقييمات العقارية</span>';
        renderValuations();
    }
    else if (viewName === 'pm-providers') {
        activate('menu-pm-providers');
        breadcrumb.innerHTML = '<a href="#">إدارة المشاريع</a> <i class="fa-solid fa-chevron-left" style="font-size:10px"></i> <span class="current">مزودي الخدمة</span>';
        renderServiceProviders();
    }
}

// 4. RENDERING FUNCTIONS

// --- ASSETS ---
function renderAssets() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">سجل الأصول الوقفية</h2>
                    <p style="font-size: 14px; color: var(--text-muted);">نظرة عامة على المحفظة العقارية</p>
                </div>
                <div style="display:flex; gap:12px;">
                    <button class="btn btn-outline"><i class="fa-solid fa-file-excel"></i> تصدير</button>
                    <button class="btn btn-primary"><i class="fa-solid fa-plus"></i> إضافة أصل</button>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px;">
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid var(--border-base);">
                    <div style="color: var(--text-muted); font-size: 11px; font-weight: 800; text-transform: uppercase;">إجمالي الأصول</div>
                    <div style="font-size: 24px; font-weight: 800; color: var(--primary-teal); font-family: 'Inter';">2</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid var(--border-base);">
                    <div style="color: var(--text-muted); font-size: 11px; font-weight: 800; text-transform: uppercase;">إجمالي الوحدات</div>
                    <div style="font-size: 24px; font-weight: 800; color: var(--primary-teal); font-family: 'Inter';">69</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid var(--border-base);">
                    <div style="color: var(--text-muted); font-size: 11px; font-weight: 800; text-transform: uppercase;">نسبة الإشغال العام</div>
                    <div style="font-size: 24px; font-weight: 800; color: var(--success); font-family: 'Inter';">85%</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid var(--border-base);">
                    <div style="color: var(--text-muted); font-size: 11px; font-weight: 800; text-transform: uppercase;">المساحة الإجمالية</div>
                    <div style="font-size: 24px; font-weight: 800; color: var(--accent-gold); font-family: 'Inter';">6,700 م²</div>
                </div>
            </div>

            <div class="card-table">
                <table class="enterprise-table" id="assets-table">
                    <thead>
                        <tr>
                            <th>رمز الأصل</th>
                            <th>اسم الأصل</th>
                            <th>النوع</th>
                            <th>المدينة</th>
                            <th>المساحة</th>
                            <th>الوحدات</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ASSETS.map(a => `
                            <tr>
                                <td style="font-weight: 700; color: var(--primary-teal); font-family:'Inter'">${a.id}</td>
                                <td style="font-weight: 800;">${a.name}</td>
                                <td>${a.type}</td>
                                <td>${a.city}</td>
                                <td style="font-family: 'Inter';">${a.area} م²</td>
                                <td style="font-family: 'Inter'; font-weight: 700;">${a.unitsCount}</td>
                                <td>
                                    <div style="display:flex; gap:8px;">
                                        <button class="btn btn-outline btn-sm" onclick="openAssetDrawer('${a.id}')">التفاصيل</button>
                                        <button class="btn btn-primary btn-sm" onclick="showView('units', '${a.id}')">الوحدات</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function openAssetDrawer(id) {
    const a = ASSETS.find(x => x.id === id);
    document.getElementById('drawer-title').innerText = 'تفاصيل الأصل الـوقفي';
    const content = document.getElementById('drawer-content');

    content.innerHTML = `
        <div class="view-only-group">
            <span class="view-only-label">رمز الأصل</span>
            <div class="view-only-value" style="font-family:'Inter'">${a.id}</div>
        </div>
        <div class="view-only-group">
            <span class="view-only-label">اسم الأصل</span>
            <div class="view-only-value">${a.name}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group">
                <span class="view-only-label">نوع الأصل</span>
                <div class="view-only-value">${a.type}</div>
            </div>
            <div class="view-only-group">
                <span class="view-only-label">الحالة</span>
                <span class="badge badge-success">${a.status}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group">
                <span class="view-only-label">المدينة</span>
                <div class="view-only-value">${a.city}</div>
            </div>
            <div class="view-only-group">
                <span class="view-only-label">الحي</span>
                <div class="view-only-value">${a.district}</div>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group">
                <span class="view-only-label">المساحة</span>
                <div class="view-only-value" style="font-family:'Inter'">${a.area} م²</div>
            </div>
            <div class="view-only-group">
                <span class="view-only-label">عدد الوحدات</span>
                <div class="view-only-value" style="font-family:'Inter'">${a.unitsCount}</div>
            </div>
        </div>
        <div class="view-only-group">
            <span class="view-only-label">ملاحظات</span>
            <div class="view-only-value" style="font-weight:400; font-size:13px;">${a.notes}</div>
        </div>
        <div style="margin-top:20px; padding:16px; background:#F8FAFC; border-radius:8px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div class="view-only-group" style="margin:0"><span class="view-only-label">المستخدم</span><div class="view-only-value">${a.addedBy}</div></div>
            <div class="view-only-group" style="margin:0"><span class="view-only-label">التاريخ</span><div class="view-only-value" style="font-family:'Inter'">${a.addedDate}</div></div>
        </div>
    `;

    document.getElementById('drawer-footer').innerHTML = `
        <button class="btn btn-primary" onclick="closeDrawer(); showView('units', '${a.id}')">إدارة وحدات الأصل</button>
    `;
    openDrawer();
}

// --- UNITS ---
function renderUnits(assetFilter = null) {
    const area = document.getElementById('content-area');
    const filtered = assetFilter ? UNITS.filter(u => u.asset === assetFilter) : UNITS;

    let contextCard = '';
    if (assetFilter) {
        const asset = ASSETS.find(a => a.id === assetFilter);
        contextCard = `
            <div class="context-summary-card">
                <div class="summary-item">
                    <span class="summary-label">تستعرض وحدات الأصل:</span>
                    <span class="summary-value">${asset.name}</span>
                </div>
                <button class="btn btn-outline btn-sm" onclick="showView('assets')">العودة للأصول</button>
            </div>
        `;
    }

    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">إدارة الوحدات الوقفية</h2>
                    <p style="font-size: 14px; color: var(--text-muted);">بيانات الوحدات الإيجارية</p>
                </div>
            </div>
            ${contextCard}
            <div class="card-table">
                <table class="enterprise-table" id="units-table">
                    <thead>
                        <tr>
                            <th>رمز الوحدة</th>
                            <th>النوع</th>
                            <th>الحالة</th>
                            <th>المساحة</th>
                            <th>القيمة التقديرية</th>
                            <th>نزع؟</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.map(u => `
                            <tr>
                                <td style="font-weight: 700; color: var(--primary-teal);">${u.id}</td>
                                <td>${u.type}</td>
                                <td><span class="badge ${u.status === 'مؤجرة' ? 'badge-success' : 'badge-warning'}">${u.status}</span></td>
                                <td style="font-family: 'Inter';">${u.area} م²</td>
                                <td style="font-family: 'Inter'; font-weight: 700;">${u.estRent} ر.س</td>
                                <td>${u.affected === 'نعم' ? '<i class="fa-solid fa-triangle-exclamation" style="color:var(--danger)"></i>' : 'لا'}</td>
                                <td><button class="btn btn-outline btn-sm" onclick="openUnitDrawer('${u.id}')">التفاصيل</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function openUnitDrawer(id) {
    const unit = UNITS.find(u => u.id === id);
    document.getElementById('drawer-title').innerText = 'بيانات الوحدة الاستثمارية';
    const content = document.getElementById('drawer-content');

    content.innerHTML = `
        <div class="view-only-group">
            <span class="view-only-label">رمز الوحدة (آلي)</span>
            <div class="view-only-value">${unit.id}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group"><span class="view-only-label">رمز ياردي</span><div class="view-only-value">${unit.yardi}</div></div>
            <div class="view-only-group"><span class="view-only-label">رقم إيجار الموحد</span><div class="view-only-value" style="font-family:'Inter'">${unit.unified}</div></div>
        </div>
        <div class="view-only-group"><span class="view-only-label">رقم الأصل</span><div class="view-only-value">${unit.asset}</div></div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group"><span class="view-only-label">نوع الوحدة</span><div class="view-only-value">${unit.type}</div></div>
            <div class="view-only-group"><span class="view-only-label">حالة الوحدة</span><span class="badge ${unit.status === 'مؤجرة' ? 'badge-success' : 'badge-warning'}">${unit.status}</span></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group"><span class="view-only-label">المساحة</span><div class="view-only-value" style="font-family:'Inter'">${unit.area} م²</div></div>
            <div class="view-only-group"><span class="view-only-label">الدور</span><div class="view-only-value">${unit.floor}</div></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
             <div class="view-only-group"><span class="view-only-label">الاستخدام</span><div class="view-only-value">${unit.mainUse}</div></div>
             <div class="view-only-group"><span class="view-only-label">الفرعي</span><div class="view-only-value">${unit.subUse}</div></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
             <div class="view-only-group"><span class="view-only-label">إخلاء هجري</span><div class="view-only-value" style="font-family:'Inter'">${unit.lastVacateH}</div></div>
             <div class="view-only-group"><span class="view-only-label">إخلاء ميلادي</span><div class="view-only-value" style="font-family:'Inter'">${unit.lastVacateM}</div></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
             <div class="view-only-group"><span class="view-only-label">عداد الكهرباء</span><div class="view-only-value" style="font-family:'Inter'">${unit.electric}</div></div>
             <div class="view-only-group"><span class="view-only-label">عداد المياه</span><div class="view-only-value" style="font-family:'Inter'">${unit.water}</div></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
             <div class="view-only-group"><span class="view-only-label">القيمة المقدرة</span><div class="view-only-value">${unit.estRent} ر.س</div></div>
             <div class="view-only-group"><span class="view-only-label">متأثرة بالنزع؟</span><div class="view-only-value" style="color:${unit.affected === 'نعم' ? 'var(--danger)' : 'var(--success)'}">${unit.affected}</div></div>
        </div>
        <div class="view-only-group"><span class="view-only-label">ملاحظات</span><div class="view-only-value" style="font-weight:400; font-size:13px;">${unit.notes}</div></div>
    `;

    document.getElementById('drawer-footer').innerHTML = `
        <button class="btn btn-primary" onclick="closeDrawer(); showView('contracts', '${unit.yardi}')">عقود الإيجار</button>
        <button class="btn btn-outline" onclick="closeDrawer(); showView('payments', '${unit.yardi}')">الدفعات</button>
    `;
    openDrawer();
}

// --- CONTRACTS ---
function renderContracts(unitFilter = null) {
    const area = document.getElementById('content-area');
    const filtered = unitFilter ? CONTRACTS.filter(c => c.unitYardi === unitFilter) : CONTRACTS;

    let contextCard = '';
    if (unitFilter) {
        const unit = UNITS.find(u => u.yardi === unitFilter);
        contextCard = `<div class="context-summary-card"><div class="summary-item"><span class="summary-label">عقود الوحدة:</span><span class="summary-value">${unit.id}</span></div><button class="btn btn-outline btn-sm" onclick="showView('units')">العودة للوحدات</button></div>`;
    }

    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <h2 style="font-size: 24px; color: var(--primary-teal); font-weight:800; margin-bottom:24px;">سجل عقود الإيجار</h2>
            ${contextCard}
            <div class="card-table">
                <table class="enterprise-table" id="contracts-table">
                    <thead>
                        <tr><th>رمز العقد</th><th>المستأجر</th><th>البداية</th><th>النهاية</th><th>القيمة</th><th>الحالة</th><th>الإجراءات</th></tr>
                    </thead>
                    <tbody>
                        ${filtered.map(c => `
                            <tr>
                                <td style="font-weight: 700; color: var(--primary-teal);">${c.id}</td>
                                <td>${c.tenant}</td>
                                <td style="font-family:'Inter'">${c.startM}</td>
                                <td style="font-family:'Inter'">${c.endM}</td>
                                <td style="font-family:'Inter'; font-weight:700;">${c.annualRent} ر.س</td>
                                <td><span class="badge badge-success">${c.status}</span></td>
                                <td><button class="btn btn-outline btn-sm" onclick="openContractDrawer('${c.id}')">التفاصيل</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function openContractDrawer(id) {
    const c = CONTRACTS.find(x => x.id === id);
    document.getElementById('drawer-title').innerText = 'بيانات عقد الإيجار';
    const content = document.getElementById('drawer-content');
    content.innerHTML = `
        <div class="view-only-group"><span class="view-only-label">رمز العقد</span><div class="view-only-value">${c.id}</div></div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div class="view-only-group"><span class="view-only-label">ياردي</span><div class="view-only-value">${c.yardi}</div></div>
            <div class="view-only-group"><span class="view-only-label">وحدة</span><div class="view-only-value">${c.unitYardi}</div></div>
        </div>
        <div class="view-only-group"><span class="view-only-label">المستأجر</span><div class="view-only-value">${c.tenant}</div></div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div class="view-only-group"><span class="view-only-label">البداية</span><div class="view-only-value">${c.startM}</div></div>
            <div class="view-only-group"><span class="view-only-label">النهاية</span><div class="view-only-value">${c.endM}</div></div>
        </div>
        <div class="view-only-group"><span class="view-only-label">إجمالي القيمة</span><div class="view-only-value" style="color:var(--primary-teal)">${c.totalValue} ر.س</div></div>
    `;
    document.getElementById('drawer-footer').innerHTML = `<button class="btn btn-primary" onclick="closeDrawer(); showView('payments', '${c.yardi}')">عرض الدفعات</button>`;
    openDrawer();
}

// --- PAYMENTS ---
function renderPayments(filterVal = null) {
    const area = document.getElementById('content-area');
    const filtered = filterVal ? PAYMENTS.filter(p => p.conYardi === filterVal || p.unitYardi === filterVal) : PAYMENTS;

    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <h2 style="font-size: 24px; color: var(--primary-teal); font-weight:800; margin-bottom:24px;">جدول تحصيل الدفعات</h2>
            <div class="card-table">
                <table class="enterprise-table" id="payments-table">
                    <thead>
                        <tr>
                            <th>رمز الدفعة</th>
                            <th>رقم</th>
                            <th>تاريخ الاستحقاق</th>
                            <th>المبلغ</th>
                            <th>المسدد</th>
                            <th>الحالة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.map(p => `
                            <tr>
                                <td style="font-weight: 600; color: var(--primary-teal); font-family:'Inter'">${p.id}</td>
                                <td style="font-family:'Inter'">${p.num}</td>
                                <td style="font-family:'Inter'">${p.dueM}</td>
                                <td style="font-family:'Inter'; font-weight:700;">${p.amount} ر.س</td>
                                <td style="font-family:'Inter'">${p.paid} ر.س</td>
                                <td><span class="badge badge-success">${p.status}</span></td>
                                <td>
                                    <button class="btn btn-outline btn-sm" onclick="openPaymentDrawer('${p.id}')">التفاصيل</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function openPaymentDrawer(id) {
    const p = PAYMENTS.find(x => x.id === id);
    document.getElementById('drawer-title').innerText = 'تفاصيل دفعة الإيجار';
    const content = document.getElementById('drawer-content');

    content.innerHTML = `
        <div class="view-only-group">
            <span class="view-only-label">رمز الدفعة</span>
            <div class="view-only-value" style="font-family:'Inter'">${p.id}</div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group">
                <span class="view-only-label">تاريخ استحقاق الدفعة هجري</span>
                <div class="view-only-value" style="font-family:'Inter'">${p.dueH}</div>
            </div>
            <div class="view-only-group">
                <span class="view-only-label">تاريخ استحقاق الدفعة ميلادي</span>
                <div class="view-only-value" style="font-family:'Inter'">${p.dueM}</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group">
                <span class="view-only-label">تاريخ السداد الفعلي هجري</span>
                <div class="view-only-value" style="font-family:'Inter'">${p.paidDateH || '-'}</div>
            </div>
            <div class="view-only-group">
                <span class="view-only-label">تاريخ السداد الفعلي ميلادي</span>
                <div class="view-only-value" style="font-family:'Inter'">${p.paidDateM || '-'}</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="view-only-group">
                <span class="view-only-label">المبلغ المستحق</span>
                <div class="view-only-value" style="font-family:'Inter'; font-weight: 700;">${p.amount} ر.س</div>
            </div>
            <div class="view-only-group">
                <span class="view-only-label">المبلغ المسدد</span>
                <div class="view-only-value" style="font-family:'Inter'; color: var(--success); font-weight: 700;">${p.paid} ر.س</div>
            </div>
        </div>

        <div class="view-only-group">
            <span class="view-only-label">الحالة</span>
            <span class="badge badge-success">${p.status}</span>
        </div>

        <div class="view-only-group">
            <span class="view-only-label">ملاحظات الدفعة</span>
            <div class="view-only-value">${p.notes}</div>
        </div>

        <div style="margin-top: 24px; padding: 20px; background: #F8FAFC; border-radius: 8px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div class="view-only-group" style="margin-bottom:0">
                    <span class="view-only-label">مستخدم الإضافة</span>
                    <div class="view-only-value">${p.addedBy}</div>
                </div>
                <div class="view-only-group" style="margin-bottom:0">
                    <span class="view-only-label">تاريخ الإضافة</span>
                    <div class="view-only-value" style="font-family:'Inter'">${p.addedDate}</div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="view-only-group" style="margin-bottom:0">
                    <span class="view-only-label">مستخدم التعديل</span>
                    <div class="view-only-value">${p.modifiedBy}</div>
                </div>
                <div class="view-only-group" style="margin-bottom:0">
                    <span class="view-only-label">تاريخ آخر تعديل</span>
                    <div class="view-only-value" style="font-family:'Inter'">${p.modifiedDate}</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('drawer-footer').innerHTML = `
        <button class="btn btn-outline" onclick="closeDrawer()">إغلاق</button>
    `;
    openDrawer();
}

// --- REUSABLE COMPONENTS ---
function renderActionBar(title, tableId = 'data-table') {
    return `
        <div class="action-bar">
            <div class="search-input-group">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="بحث سريع في ${title}..." onkeyup="filterTable(this, '${tableId}')">
            </div>
            <div class="action-group">
                <button class="btn btn-primary" onclick="showToast('تمت الإضافة بنجاح', 'success')"><i class="fa-solid fa-plus"></i> إضافة</button>
                <button class="btn btn-outline" onclick="showToast('جاري التحديث...', 'info')"><i class="fa-solid fa-pen"></i> تحديث</button>
                <div style="width:1px; height:24px; background:var(--border-base); margin:0 8px;"></div>
                <button class="btn btn-outline" onclick="showToast('جاري تصدير الملف...', 'info')"><i class="fa-solid fa-download"></i> تصدير</button>
                <button class="btn btn-outline"><i class="fa-solid fa-filter"></i> بحث متقدم</button>
            </div>
        </div>
    `;
}

function filterTable(input, tableId) {
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `
        <i class="fa-solid ${icon}" style="color:var(--${type})"></i>
        <span style="font-size:13px; font-weight:700;">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 6. PM RENDERING FUNCTIONS

function renderAgreements() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px;">
                <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">الاتفاقيات الإطارية (المستقلة)</h2>
                <p style="font-size: 14px; color: var(--text-muted);">إدارة العقود والارتباطات المالية المستقلة</p>
            </div>
            
            ${renderActionBar('الاتفاقيات', 'agreements-table')}

            <div class="card-table">
                <table class="enterprise-table" id="agreements-table">
                    <thead>
                        <tr>
                            <th>رقم الاتفاقية</th>
                            <th>الاسم / الوصف</th>
                            <th>النوع</th>
                            <th>الحالة</th>
                            <th>تاريخ البداية</th>
                            <th>تاريخ الانتهاء</th>
                            <th>سقف الارتباط (SAR)</th>
                            <th>رقم الاعتماد</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${PM_AGREEMENTS.map(a => `
                            <tr>
                                <td style="font-weight: 700; color: var(--primary-teal); font-family:'Inter'">${a.num}</td>
                                <td style="font-weight: 800;">${a.name}</td>
                                <td>${a.type}</td>
                                <td><span class="badge ${a.status === 'قيد التنفيذ' ? 'badge-success' : 'badge-warning'}">${a.status}</span></td>
                                <td style="font-family:'Inter'">${a.startM}</td>
                                <td style="font-family:'Inter'">${a.endM}</td>
                                <td style="font-family:'Inter'; font-weight:700;">${a.ceiling} ر.س</td>
                                <td style="font-family:'Inter'">${a.approvalNum}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderAgreementServices() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px;">
                <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">خدمات الاتفاقيات (قائمة مستقلة)</h2>
                <p style="font-size: 14px; color: var(--text-muted);">دليل الخدمات والأسعار الموحد لكافة الاتفاقيات</p>
            </div>
            ${renderActionBar('الخدمات', 'services-table')}
            <div class="card-table">
                <table class="enterprise-table" id="services-table">
                    <thead>
                        <tr>
                            <th>كود الخدمة</th>
                            <th>رقم الاتفاقية</th>
                            <th>اسم الخدمة</th>
                            <th>الوحدة</th>
                            <th>سعر الوحدة</th>
                            <th>الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${PM_SERVICES.map(s => `
                            <tr>
                                <td style="font-weight: 700;">${s.id}</td>
                                <td style="font-family:'Inter'">${s.agrId}</td>
                                <td style="font-weight: 800;">${s.service}</td>
                                <td>${s.unit}</td>
                                <td style="font-family:'Inter'; font-weight: 700;">${s.price} ر.س</td>
                                <td><span class="badge badge-success">${s.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderProjects() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px;">
                <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">إدارة المشاريع (قائمة مستقلة)</h2>
                <p style="font-size: 14px; color: var(--text-muted);">متابعة المشاريع الإنشائية والتطويرية المستقلة عن الوحدات</p>
            </div>

            <div class="kpi-strip">
                <div class="kpi-card">
                    <span class="kpi-label">إجمالي المشاريع</span>
                    <span class="kpi-value">12</span>
                </div>
                <div class="kpi-card">
                    <span class="kpi-label">قيد التنفيذ</span>
                    <span class="kpi-value" style="color:var(--accent-gold)">8</span>
                </div>
                <div class="kpi-card" style="border-right: 4px solid var(--primary-teal);">
                    <span class="kpi-label">الميزانية المرصودة</span>
                    <span class="kpi-value">4.5M</span>
                </div>
            </div>

            ${renderActionBar('المشاريع', 'projects-table')}

            <div class="card-table">
                <table class="enterprise-table" id="projects-table">
                    <thead>
                        <tr>
                            <th>رقم المشروع</th>
                            <th>اسم المشروع</th>
                            <th>نوع المشروع</th>
                            <th>الموقع / الأصل</th>
                            <th>الحالة</th>
                            <th>الميزانية</th>
                            <th>تاريخ الانتهاء</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${PM_PROJECTS.map(p => `
                            <tr>
                                <td style="font-weight: 700; color: var(--primary-teal); font-family:'Inter'">${p.num}</td>
                                <td style="font-weight: 800;">${p.name}</td>
                                <td>${p.prjType}</td>
                                <td>${p.siteName}</td>
                                <td><span class="badge ${p.status === 'قيد التنفيذ' ? 'badge-warning' : 'badge-success'}">${p.status}</span></td>
                                <td style="font-family:'Inter'; font-weight: 700;">${p.budget} ر.س</td>
                                <td style="font-family:'Inter'">${p.endM}</td>
                                <td>
                                    <button class="btn btn-outline btn-sm" onclick="showView('pm-workorders', '${p.id}')">أوامر العمل</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderWorkOrders() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800; margin-bottom:24px;">أوامر العمل المستقلة (Work Orders)</h2>
            ${renderActionBar('أوامر العمل', 'workorders-table')}
            <div class="card-table">
                <table class="enterprise-table" id="workorders-table">
                    <thead>
                        <tr>
                            <th>رقم الأمر</th>
                            <th>المشروع الملحق</th>
                            <th>اسم المهمة</th>
                            <th>النوع</th>
                            <th>الأولوية</th>
                            <th>التكلفة</th>
                            <th>الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${PM_WORK_ORDERS.map(w => `
                            <tr>
                                <td style="font-weight: 700; color: var(--primary-teal); font-family:'Inter'">${w.num}</td>
                                <td>${w.prjId}</td>
                                <td style="font-weight: 800;">${w.name}</td>
                                <td>${w.woType}</td>
                                <td><span class="badge badge-danger">${w.priority}</span></td>
                                <td style="font-family:'Inter'">${w.estCost} ر.س</td>
                                <td><span class="badge badge-warning">${w.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderTechnicalReport() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800; margin-bottom:12px;">التقرير الفني الشامل</h2>
            <p style="font-size: 14px; color: var(--text-muted); margin-bottom:24px;">نموذج جمع البيانات الفنية والهندسية للأصول الوقفية</p>
            
            <div class="tabs-container">
                <div class="tabs-header">
                    <button class="tab-btn active" onclick="switchTab(this, 'tab-site')">بيانات الموقع</button>
                    <button class="tab-btn" onclick="switchTab(this, 'tab-construction')">بيانات البناء</button>
                    <button class="tab-btn" onclick="switchTab(this, 'tab-systems')">الأنظمة والخدمات</button>
                    <button class="tab-btn" onclick="switchTab(this, 'tab-safety')">السلامة</button>
                    <button class="tab-btn" onclick="switchTab(this, 'tab-rental')">بيانات التأجير</button>
                    <button class="tab-btn" onclick="switchTab(this, 'tab-licenses')">التراخيص</button>
                    <button class="tab-btn" onclick="switchTab(this, 'tab-notes')">ملاحظات عامة</button>
                </div>
                
                <div id="tab-site" class="tab-content active">
                    <div class="form-grid">
                        <div class="form-group"><label>رمز الأصل الوقفي</label><input type="text" value="AST-992201" readonly></div>
                        <div class="form-group"><label>الإحداثيات (N/E)</label><input type="text" placeholder="24.7136, 46.6753"></div>
                        <div class="form-group"><label>وصف الموقع العام</label><textarea rows="3"></textarea></div>
                        <div class="form-group"><label>صورة الموقع</label><div style="border:2px dashed var(--border-base); height:110px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:8px; color:var(--text-muted); cursor:pointer;"><i class="fa-solid fa-cloud-arrow-up" style="font-size:24px; margin-bottom:8px;"></i><span>رفع صورة جوية / كروكي</span></div></div>
                    </div>
                </div>

                <div id="tab-construction" class="tab-content">
                    <div class="form-grid">
                        <div class="form-group"><label>عدد الأدوار</label><input type="number" placeholder="0"></div>
                        <div class="form-group"><label>مادة البناء الرئيسي</label><select><option>خرسانة مسلحة</option><option>هيكل حديدي</option><option>أخرى</option></select></div>
                        <div class="form-group"><label>تاريخ الإنشاء</label><input type="text" placeholder="14XX/XX/XX"></div>
                        <div class="form-group"><label>حالة الهيكل الإنشائي</label><select><option>ممتاز</option><option>جيد جداً</option><option>جيد - يحتاج صيانة</option><option>متهالك</option></select></div>
                        <div class="form-group"><label>هل المبنى مجدد؟</label><div style="display:flex; gap:20px; padding:10px 0;"><label style="font-weight:400;"><input type="radio" name="renovated"> نعم</label><label style="font-weight:400;"><input type="radio" name="renovated"> لا</label></div></div>
                        <div class="form-group"><label>ملاحظات البناء</label><textarea rows="2"></textarea></div>
                    </div>
                </div>

                <div id="tab-systems" class="tab-content">
                    <div class="form-grid">
                        <div class="form-group"><label>نظام التكييف</label><select><option>مركزي (Chiller)</option><option>سبليت (Split)</option><option>صحراوي</option></select></div>
                        <div class="form-group"><label>عدد المصاعد</label><input type="number" value="0"></div>
                        <div class="form-group"><label>شبكة مكافحة الحريق</label><select><option>نظام رش آلي + صناديق</option><option>طفيات يدوي فقط</option><option>لا يوجد</option></select></div>
                        <div class="form-group"><label>نظام المراقبة والأمن</label><div style="display:flex; gap:10px; margin-top:5px;"><label><input type="checkbox"> كاميرات</label><label><input type="checkbox"> أجهزة إنذار</label></div></div>
                    </div>
                </div>

                <div id="tab-safety" class="tab-content">
                    <div class="form-grid">
                        <div class="form-group"><label>شهادة إتمام البناء</label><div style="display:flex; gap:20px; padding:10px 0;"><label style="font-weight:400;"><input type="radio" name="cert"> متوفرة</label><label style="font-weight:400;"><input type="radio" name="cert"> غير متوفرة</label></div></div>
                        <div class="form-group"><label>تقرير الدفاع المدني</label><input type="text" placeholder="رقم التقرير إن وجد"></div>
                        <div class="form-group"><label>اشتراطات السلامة</label><textarea rows="3" placeholder="أدخل أي ملاحظات تخص سلامة المبنى"></textarea></div>
                        <div class="form-group"><label>تاريخ آخر فحص سلامة</label><input type="text" placeholder="1445/01/01"></div>
                    </div>
                </div>

                <div id="tab-rental" class="tab-content">
                    <div class="form-grid">
                        <div class="form-group"><label>طريقة التأجير</label><select><option>تأجير مباشر</option><option>شركة إدارة أملاك</option><option>استثمار طويل الأمد</option></select></div>
                        <div class="form-group"><label>متوسط سعر الإيجار (م²)</label><input type="text" placeholder="0.00"></div>
                        <div class="form-group"><label>عوائد الاستثمار السنوية</label><input type="text" placeholder="0%"></div>
                        <div class="form-group"><label>مؤشر الطلب في المنطقة</label><select><option>مرتفع جداً</option><option>مرتفع</option><option>متوسط</option><option>منخفض</option></select></div>
                    </div>
                </div>

                <div id="tab-licenses" class="tab-content">
                    <div class="form-grid">
                        <div class="form-group"><label>رقم الترخيص الإنشائي</label><input type="text"></div>
                        <div class="form-group"><label>جهة الإصدار</label><input type="text" value="أمانة منطقة الرياض"></div>
                        <div class="form-group"><label>تاريخ الانتهاء</label><input type="text" placeholder="هجري / ميلادي"></div>
                        <div class="form-group"><label>ارفاق التراخيص</label><input type="file" multiple></div>
                    </div>
                </div>

                <div id="tab-notes" class="tab-content">
                    <div class="form-group"><label>ملاحظات عامة وتوصيات هندسية</label><textarea rows="8" placeholder="أدخل أي ملاحظات إضافية هنا..."></textarea></div>
                </div>
            </div>

            <div style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 12px;">
                <button class="btn btn-outline">حفظ كمسودة</button>
                <button class="btn btn-primary">اعتماد التقرير</button>
            </div>
        </div>
    `;
}

function switchTab(btn, tabId) {
    const container = btn.closest('.tabs-container');
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function renderValuations() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800; margin-bottom:24px;">التقييمات العقارية</h2>
            ${renderActionBar('التقييمات', 'valuations-table')}
            <div class="card-table">
                <table class="enterprise-table" id="valuations-table">
                    <thead>
                        <tr>
                            <th>رقم الأصل</th>
                            <th>المقيم</th>
                            <th>تاريخ التقييم</th>
                            <th>تقييم الأرض</th>
                            <th>تقييم المبنى (بيع)</th>
                            <th>إجمالي القيمة</th>
                            <th>الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${PM_VALUATIONS.map(v => `
                            <tr>
                                <td style="font-family:'Inter'">${v.assetId}</td>
                                <td style="font-weight: 800;">${v.evaluator}</td>
                                <td style="font-family:'Inter'">${v.date}</td>
                                <td style="font-family:'Inter'">${v.landVal}</td>
                                <td style="font-family:'Inter'">${v.buildingSale}</td>
                                <td style="font-family:'Inter'; font-weight: 700; color:var(--primary-teal)">${v.totalVal} ر.س</td>
                                <td><span class="badge badge-success">معتمد</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderServiceProviders() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800; margin-bottom:24px;">سجل مزودي الخدمة المعتمدين</h2>
            ${renderActionBar('مزودي الخدمة', 'providers-table')}
            <div class="card-table">
                <table class="enterprise-table" id="providers-table">
                    <thead>
                        <tr>
                            <th>رمز المزود</th>
                            <th>الاسم</th>
                            <th>النوع</th>
                            <th>حالة الترخيص</th>
                            <th>انتهاء الترخيص</th>
                            <th>التقييم</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${PM_PROVIDERS.map(p => `
                            <tr>
                                <td style="font-family:'Inter'">${p.id}</td>
                                <td style="font-weight: 800;">${p.name}</td>
                                <td>${p.type}</td>
                                <td><span class="badge ${p.licenseStatus === 'ساري' ? 'badge-success' : 'badge-danger'}">${p.licenseStatus}</span></td>
                                <td style="font-family:'Inter'">${p.licenseEnd}</td>
                                <td style="color:var(--accent-gold); white-space: nowrap;">
                                    ${Array(5).fill(0).map((_, i) => `<i class="fa-${i < Math.floor(p.rating) ? 'solid' : 'regular'} fa-star"></i>`).join('')}
                                    <span style="color:var(--text-muted); font-size:11px; margin-right:4px;">(${p.rating})</span>
                                </td>
                                <td><button class="btn btn-outline btn-sm">الملف التعريفي</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 5. HELPER FUNCTIONS
function openDrawer() {
    document.getElementById('side-drawer').classList.add('drawer-content-open');
    document.getElementById('drawer-overlay').classList.add('drawer-open');
}
function closeDrawer() {
    document.getElementById('side-drawer').classList.remove('drawer-content-open');
    document.getElementById('drawer-overlay').classList.remove('drawer-open');
}

function renderDashboard() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">لوحة المؤشرات والتقارير العامة</h2>
                    <p style="font-size: 14px; color: var(--text-muted);">نظرة شاملة على أداء المحفظة الوقفية والمشاريع القائمة</p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn-outline"><i class="fa-solid fa-calendar-days"></i> آخر 30 يوم</button>
                    <button class="btn btn-primary"><i class="fa-solid fa-file-pdf"></i> تصدير التقرير التنفيذي</button>
                </div>
            </div>

            <div class="kpi-strip">
                <div class="kpi-card">
                    <span class="kpi-label">إجمالي قيمة الأصول</span>
                    <span class="kpi-value">4.2B</span>
                    <span style="font-size:11px; color:var(--success); font-weight:700;"><i class="fa-solid fa-arrow-up"></i> 12% +</span>
                </div>
                <div class="kpi-card">
                    <span class="kpi-label">تحصيل الإيجارات (YTD)</span>
                    <span class="kpi-value">12.5M</span>
                </div>
                <div class="kpi-card">
                    <span class="kpi-label">عدد الوحدات الكلي</span>
                    <span class="kpi-value">842</span>
                </div>
                <div class="kpi-card">
                    <span class="kpi-label">المشاريع النشطة</span>
                    <span class="kpi-value">12</span>
                </div>
            </div>

            <div class="analytics-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <span class="chart-title">توزيع الإيرادات حسب نوع الأصل</span>
                        <i class="fa-solid fa-ellipsis-vertical" style="color:var(--text-muted)"></i>
                    </div>
                    <div class="chart-placeholder">
                        <div class="bar-container">
                            <div class="bar" style="height: 80%" data-value="45%"></div>
                            <span class="bar-label">بناء سكني</span>
                        </div>
                        <div class="bar-container">
                            <div class="bar" style="height: 60%; background:#8B5CF6" data-value="30%"></div>
                            <span class="bar-label">تجاري</span>
                        </div>
                        <div class="bar-container">
                            <div class="bar" style="height: 40%; background:#F59E0B" data-value="15%"></div>
                            <span class="bar-label">مكاتب</span>
                        </div>
                        <div class="bar-container">
                            <div class="bar" style="height: 25%; background:#EF4444" data-value="10%"></div>
                            <span class="bar-label">أخرى</span>
                        </div>
                    </div>
                </div>

                <div class="chart-card" style="display: flex; justify-content: space-around; align-items: center;">
                    <div class="progress-circle-container">
                        <span class="chart-title" style="margin-bottom:10px;">نسبة الإشغال الكلية</span>
                        <div class="progress-circle" style="--percentage: 316.8deg;">
                            <span>88%</span>
                        </div>
                        <p style="font-size:12px; color:var(--text-muted); text-align:center;">741 وحدة مؤجرة من أصل 842</p>
                    </div>
                    <div style="flex: 1; padding: 0 20px;">
                        <h4 style="font-size: 14px; margin-bottom: 15px;">حالة العقود القادمة</h4>
                        <div style="margin-bottom:12px;">
                            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;"><span>عقود تنتهي قريباً (30 يوم)</span><span style="font-weight:700;">12</span></div>
                            <div style="height:6px; background:#F1F5F9; border-radius:3px;"><div style="width:15%; height:100%; background:var(--danger); border-radius:3px;"></div></div>
                        </div>
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;"><span>طلبات تجديد معلقة</span><span style="font-weight:700;">45</span></div>
                            <div style="height:6px; background:#F1F5F9; border-radius:3px;"><div style="width:40%; height:100%; background:var(--accent-gold); border-radius:3px;"></div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-table">
                <div style="padding: 20px; border-bottom: 1px solid var(--border-base); display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="font-size:16px; font-weight:800;">الأصول الأكثر عائداً (Top 5 Assets)</h3>
                    <button class="btn btn-outline btn-sm">عرض الكل</button>
                </div>
                <table class="enterprise-table">
                    <thead>
                        <tr>
                            <th>رمز الأصل</th>
                            <th>الاسم</th>
                            <th>الموقع</th>
                            <th>الإيراد السنوي</th>
                            <th>نسبة الإشغال</th>
                            <th>القيمة الحالية</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="font-family:'Inter'">AST-3901</td>
                            <td style="font-weight:800;">عمارة العليا السكنية</td>
                            <td>الرياض - العليا</td>
                            <td style="font-family:'Inter'; font-weight:700;">1,200,000 ر.س</td>
                            <td><span class="badge badge-success">98%</span></td>
                            <td style="font-family:'Inter'">45.5M</td>
                        </tr>
                        <tr>
                            <td style="font-family:'Inter'">AST-4411</td>
                            <td style="font-weight:800;">مركز الواجهة التجاري</td>
                            <td>جدة - الكورنيش</td>
                            <td style="font-family:'Inter'; font-weight:700;">2,500,000 ر.س</td>
                            <td><span class="badge badge-success">92%</span></td>
                            <td style="font-family:'Inter'">82.0M</td>
                        </tr>
                        <tr>
                            <td style="font-family:'Inter'">AST-1022</td>
                            <td style="font-weight:800;">مجمع ورش الصناعية</td>
                            <td>الدمام - المدينة الصناعية</td>
                            <td style="font-family:'Inter'; font-weight:700;">850,000 ر.س</td>
                            <td><span class="badge badge-warning">75%</span></td>
                            <td style="font-family:'Inter'">18.2M</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// --- NEW CATEGORY RENDERERS ---

function renderFounder() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px;">
                <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">بيانات الواقف</h2>
                <p style="font-size: 14px; color: var(--text-muted);">المعلومات التعريفية لمنشئ الوقف</p>
            </div>
            <div class="grid-2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
                <div class="card" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid var(--border-base);">
                    <h3 style="font-size: 16px; margin-bottom: 20px; color: var(--primary-teal); border-bottom: 1px solid var(--bg-app); padding-bottom: 10px;">المعلومات الشخصية</h3>
                    <div class="view-only-group"><span class="view-only-label">اسم الواقف</span><div class="view-only-value">الملك عبدالعزيز آل سعود</div></div>
                    <div class="view-only-group"><span class="view-only-label">الجنسية</span><div class="view-only-value">سعودي</div></div>
                    <div class="view-only-group"><span class="view-only-label">نوع الهوية</span><div class="view-only-value">شخصية اعتبارية</div></div>
                </div>
                <div class="card" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid var(--border-base);">
                    <h3 style="font-size: 16px; margin-bottom: 20px; color: var(--primary-teal); border-bottom: 1px solid var(--bg-app); padding-bottom: 10px;">حالة الواقف</h3>
                    <div class="view-only-group"><span class="view-only-label">الحالة في النظام</span><div class="view-only-value"><span class="badge badge-success">نشط</span></div></div>
                    <div class="view-only-group"><span class="view-only-label">تاريخ الوفاة (إن وجد)</span><div class="view-only-value">1373 هـ</div></div>
                </div>
            </div>
        </div>
    `;
}

function renderSupervisor() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px;">
                <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">بيانات الناظر</h2>
                <p style="font-size: 14px; color: var(--text-muted);">الجهة أو الشخص المسؤول عن إدارة الوقف</p>
            </div>
            <div class="card" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid var(--border-base); margin-bottom: 24px;">
                <h3 style="font-size: 16px; margin-bottom: 20px; color: var(--primary-teal); border-bottom: 1px solid var(--bg-app); padding-bottom: 10px;">تفاصيل النظارة</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                    <div class="view-only-group"><span class="view-only-label">اسم الناظر</span><div class="view-only-value">أمانة العاصمة المقدسة</div></div>
                    <div class="view-only-group"><span class="view-only-label">نوع النظارة</span><div class="view-only-value">جهة حكومية</div></div>
                    <div class="view-only-group"><span class="view-only-label">رقم صك النظارة</span><div class="view-only-value">349001289</div></div>
                    <div class="view-only-group"><span class="view-only-label">تاريخ انتهاء الصك</span><div class="view-only-value">1450/10/20 هـ</div></div>
                    <div class="view-only-group"><span class="view-only-label">الحالة</span><div class="view-only-value"><span class="badge badge-success">ساري</span></div></div>
                </div>
            </div>
        </div>
    `;
}

function renderEndowmentDetails() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <div class="platform-view animate-fade-in">
            <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: top;">
                <div>
                    <h2 style="font-size: 24px; color: var(--primary-teal); font-weight: 800;">الأصل (الوقف)</h2>
                    <p style="font-size: 14px; color: var(--text-muted);">البيانات التاريخية والشرعية للوقف</p>
                </div>
                <span class="badge badge-success" style="padding: 10px 20px; font-size: 14px;">معتمد برقم: WQF-883921</span>
            </div>
            <div class="card" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid var(--border-base);">
                <div class="form-grid">
                    <div class="view-only-group"><span class="view-only-label">اسم الوقف</span><div class="view-only-value">وقف الملك عبدالعزيز للعين العزيزية</div></div>
                    <div class="view-only-group"><span class="view-only-label">نوع الوقف</span><div class="view-only-value">خيري عام</div></div>
                    <div class="view-only-group"><span class="view-only-label">صك الاستحقاق</span><div class="view-only-value">صك شرعي رقم 910022</div></div>
                    <div class="view-only-group" style="grid-column: span 2;"><span class="view-only-label">وصف الوقف</span><div class="view-only-value" style="font-weight: 400;">جميع العقارات والأراضي المملوكة والمخصصة لخدمة وسقيا الحجاج والمعتمرين وأهالي المنطقة.</div></div>
                </div>
            </div>
        </div>
    `;
}
