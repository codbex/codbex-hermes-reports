import { Query, NamedQueryParameter } from "sdk/db";

export interface LeadEngagement {
    readonly 'Date': Date;
    readonly 'Action Type': string;
    readonly 'Note': string;
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
            SELECT Lead Action.LEADACTION_DATE as "Date", Action Type.ACTIONTYPE_NAME as "Action Type", Lead Note.LEADNOTE_NOTE as "Note"
            FROM CODBEX_LEAD as Lead
              INNER JOIN CODBEX_LEADACTION Lead Action ON Lead.LEAD_ID = Lead Action.LEADACTION_LEAD
              INNER JOIN CODBEX_ACTIONTYPE Action Type ON Lead Action.LEADACTION_TYPE = Action Type.ACTIONTYPE_ID
              INNER JOIN CODBEX_LEADNOTE Lead Note ON Lead Action.LEADACTION_NOTE = Lead Note.LEADNOTE_ID
            ORDER BY LEADACTION_DATE DESC
            ${Number.isInteger(filter.$limit) ? ` LIMIT ${filter.$limit}` : ''}
            ${Number.isInteger(filter.$offset) ? ` OFFSET ${filter.$offset}` : ''}
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName);
    }

    public count(filter: LeadEngagementFilter): number {
        const sql = `
            SELECT COUNT(*) as REPORT_COUNT FROM (
                SELECT Lead Action.LEADACTION_DATE as "Date", Action Type.ACTIONTYPE_NAME as "Action Type", Lead Note.LEADNOTE_NOTE as "Note"
                FROM CODBEX_LEAD as Lead
                  INNER JOIN CODBEX_LEADACTION Lead Action ON Lead.LEAD_ID = Lead Action.LEADACTION_LEAD
                  INNER JOIN CODBEX_ACTIONTYPE Action Type ON Lead Action.LEADACTION_TYPE = Action Type.ACTIONTYPE_ID
                  INNER JOIN CODBEX_LEADNOTE Lead Note ON Lead Action.LEADACTION_NOTE = Lead Note.LEADNOTE_ID
                ORDER BY LEADACTION_DATE DESC
            )
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName)[0].REPORT_COUNT;
    }

}