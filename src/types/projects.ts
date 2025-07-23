export interface ProjectsCardData {
  id: number;
  title: string;
  description?: string | null | undefined;
  created_at?: string | null | undefined;
  updated_at?: string | null | undefined;
  submitters?: Array<{
    _id?: string;
    name?: string;
    username?: string;
    avatarUrl?: string;
  }>;
  requested_fund?: number;
  project_status?: string;
  horizon_group?: string | null | undefined;
  country?: string | null | undefined;
  continent?: string | null | undefined;
  website?: string | null | undefined;
  fund?: FundData;
  campaign?: CampaignData;
  link?: string;
  slug?: string;
  last_edited_by?: string | null;
  completed?: any;
  full_detail?: string | null;
  left_over_voting?: any;
  opensource?: boolean;
}

export interface ProjectData {
  id: number;
  fund_id: number;
  campaign_id: number;
  title: string;
  slug: string;
  description: string | null;
  submitters: Array<{
    _id?: string;
    name?: string;
    username?: string;
    avatarUrl?: string;
  }>;
  field_sections: any;
  last_edited_by: string | null;
  created_at: string | null;
  updated_at: string | null;
  project_status: string;
  country: string | null;
  continent: string | null;
  horizon_group: string | null;
  tags: any;
  completed: any;
  summary: string | null;
  about_team: string | null;
  full_detail: string | null;
  website: string | null;
  left_over_voting: any;
  opensource?: boolean;
  funding: {
    id: number;
    project_id: number;
    distributed_to_date: JSON | null;
    remaining: JSON | null;
    requested: JSON | null;
  };
}

export interface CampaignData {
  id: number;
  name: string;
  slug?: string;
  active?: boolean;
}

export interface FundData {
  id: number;
  name: string;
  active?: boolean;
  phase?: string;
}

export interface MetricsData {
  uniqueness?: {
    id?: number;
    rank?: number;
    value?: number;
  };
  social_and_environmental_impact?: {
    id?: number;
    has_impact?: string;
  };
}

export interface ProjectResponse {
  status_code: number;
  message: string;
  data: {
    project: ProjectData;
    campaign: CampaignData;
    fund: FundData;
    metrics: MetricsData;
  };
  error: any;
}
