import { Query, NamedQueryParameter } from "sdk/db";

export interface OpportunityPipelineReport {
    readonly 'Status': string;
    readonly 'Total Opportunities': number;
    readonly 'Total': number;
    readonly 'Currency': string;
}

export interface OpportunityPipelineReportFilter {
}

export interface OpportunityPipelineReportPaginatedFilter extends OpportunityPipelineReportFilter {
    readonly "$limit"?: number;
    readonly "$offset"?: number;
}

export class OpportunityPipelineReportRepository {

    private readonly datasourceName?: string;

    constructor(datasourceName?: string) {
        this.datasourceName = datasourceName;
    }

    public findAll(filter: OpportunityPipelineReportPaginatedFilter): OpportunityPipelineReport[] {
        const sql = `
            SELECT OpportunityStatus.OPPORTUNITYSTATUS_NAME as "Status", COUNT(Opportunity.OPPORTUNITY_ID) as "Total Opportunities", SUM(Opportunity.OPPORTUNITY_AMOUNT) as "Total", Currency.CURRENCY_CODE as "Currency"
            FROM CODBEX_OPPORTUNITYSTATUS as OpportunityStatus
              INNER JOIN CODBEX_OPPORTUNITY Opportunity ON OpportunityStatus.OPPORTUNITYSTATUS_ID = Opportunity.OPPORTUNITY_STATUS
              INNER JOIN CODBEX_CURRENCY Currency ON Opportunity.OPPORTUNITY_CURRENCY = Currency.CURRENCY_ID
            GROUP BY OpportunityStatus.OPPORTUNITYSTATUS_NAME
            ${Number.isInteger(filter.$limit) ? ` LIMIT ${filter.$limit}` : ''}
            ${Number.isInteger(filter.$offset) ? ` OFFSET ${filter.$offset}` : ''}
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName);
    }

    public count(filter: OpportunityPipelineReportFilter): number {
        const sql = `
            SELECT COUNT(*) as REPORT_COUNT FROM (
                SELECT OpportunityStatus.OPPORTUNITYSTATUS_NAME as "Status", COUNT(Opportunity.OPPORTUNITY_ID) as "Total Opportunities", SUM(Opportunity.OPPORTUNITY_AMOUNT) as "Total", Currency.CURRENCY_CODE as "Currency"
                FROM CODBEX_OPPORTUNITYSTATUS as OpportunityStatus
                  INNER JOIN CODBEX_OPPORTUNITY Opportunity ON OpportunityStatus.OPPORTUNITYSTATUS_ID = Opportunity.OPPORTUNITY_STATUS
                  INNER JOIN CODBEX_CURRENCY Currency ON Opportunity.OPPORTUNITY_CURRENCY = Currency.CURRENCY_ID
                GROUP BY OpportunityStatus.OPPORTUNITYSTATUS_NAME
            )
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName)[0].REPORT_COUNT;
    }

}