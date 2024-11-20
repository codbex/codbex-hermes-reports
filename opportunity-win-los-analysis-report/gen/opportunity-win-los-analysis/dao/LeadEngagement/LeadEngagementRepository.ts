import { Query, NamedQueryParameter } from "sdk/db";

export interface LeadEngagement {
    readonly 'leadContactname': string;
    readonly 'leadStatus': number;
    readonly 'leadactionsDate': Date;
    readonly 'leadactionsSubject': string;
}

export interface LeadEngagementFilter {
}

export interface LeadEngagementPaginatedFilter extends LeadEngagementFilter {
    readonly "$limit"?: number;
    readonly "$offset"?: number;
}

export class LeadEngagementRepository {

    private readonly datasourceName?: string;

    constructor(datasourceName?: string) {
        this.datasourceName = datasourceName;
    }

    public findAll(filter: LeadEngagementPaginatedFilter): LeadEngagement[] {
        const sql = `
            SELECT codbexLead.LEAD_CONTACTNAME as "leadContactname", codbexLead.LEAD_STATUS as "leadStatus", MAX(codbexLeadactions.LEADACTIONS_DATE) as "leadactionsDate", codbexLeadactions.LEADACTIONS_SUBJECT as "leadactionsSubject"
            FROM CODBEX_LEAD as codbexLead
              INNER JOIN CODBEX_LEADACTIONS codbexLeadactions ON LEADACTIONS_LEAD = LEAD_ID
            WHERE LEADACTIONS_LEAD = LEAD_ID
            ${Number.isInteger(filter.$limit) ? ` LIMIT ${filter.$limit}` : ''}
            ${Number.isInteger(filter.$offset) ? ` OFFSET ${filter.$offset}` : ''}
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName);
    }

    public count(filter: LeadEngagementFilter): number {
        const sql = `
            SELECT COUNT(*) as REPORT_COUNT FROM (
                SELECT codbexLead.LEAD_CONTACTNAME as "leadContactname", codbexLead.LEAD_STATUS as "leadStatus", MAX(codbexLeadactions.LEADACTIONS_DATE) as "leadactionsDate", codbexLeadactions.LEADACTIONS_SUBJECT as "leadactionsSubject"
                FROM CODBEX_LEAD as codbexLead
                  INNER JOIN CODBEX_LEADACTIONS codbexLeadactions ON LEADACTIONS_LEAD = LEAD_ID
                WHERE LEADACTIONS_LEAD = LEAD_ID
            )
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName)[0].REPORT_COUNT;
    }

}