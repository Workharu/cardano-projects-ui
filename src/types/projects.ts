export interface ProjectsData {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  total: number;
  link: string;
}

export interface ProjectsCardData {
  id: string | number;
  title: string;
  project_number: number;
  description: string;
  submitter_name: string;
  created_at: string;
  link: string;
  campaign?: {
    id: number;
    name: string;
  };
  fund?: {
    id: number;
    name: string;
  };
}

export interface ProjectData {
  id: string | number;
  full_detail: string;
  campaign_id: number;
  campaign_groupid: number;
  campaign_projectcount: number;
  campaign_name: string;
  campaign_expiry_date: string; // ISO format timestamp
  requested_fund: number;
  requested_fund_usd: number;
  project_duration: number;
  opensource: boolean;
  fund: string;
  fund_no: number;
  title: string;
  project_number: number;
  description: string;
  funnel_id: number;
  co_submitters: string;
  subscribed: boolean;
  moderate: boolean;
  member_action_allowed: boolean;
  comment_count: number;
  kudo_count: number;
  labels: string;
  render_format: number;
  kudos_allowed: boolean;
  commenting_allowed: boolean;
  commenting_enabled: boolean;
  following_enabled: boolean;
  following_project_author: boolean;
  assignment_text: string;
  pinned: boolean;
  summarized: boolean;
  draft: boolean;
  sharable: boolean;
  email_project_allowed: boolean;
  created_at: string; // ISO format timestamp
  linked_Projects: string;
  file_attachment_allowed: boolean;
  edit_project_allowed: boolean;
  followers_count: number;
  tickets: string;
  project_view_count: number;
  revision_history_count: number;
  default_tab: string;
  last_edited_at: string | null; // ISO timestamp or null
  seen: boolean;
  build_team_view_allowed: boolean;
  custom_description_label: string;
  custom_attachments: string;
  comment_attachments: string;
  attachments: string;
  submitters: {
    _id: number;
    name: string;
    username: string;
    avatarUrl: string;
  }[];
  translation_translated: boolean;
  allowedmedialist: string;
  fieldsections: string;
  projecttagholder: string;
  supercommentsholder: string;
  commentoptionsholder: string;
  lasteditedby_username: string;
  source_file: string;
  processed_at: string | null; // ISO timestamp or null
}

export interface FundData {
  id: number;
  name: string;
}

export interface CampaignData {
  id: number;
  name: string;
}
