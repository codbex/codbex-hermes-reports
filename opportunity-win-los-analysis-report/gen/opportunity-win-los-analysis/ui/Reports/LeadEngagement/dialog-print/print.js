const viewData = {
    id: 'opportunity-win-los-analysis-report-Reports-LeadEngagement-print',
    label: 'Print',
    link: '/services/web/opportunity-win-los-analysis-report/gen/opportunity-win-los-analysis/ui/Reports/LeadEngagement/dialog-print/index.html',
    perspective: 'Reports',
    view: 'LeadEngagement',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}