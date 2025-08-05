/** Types **/
import { ProjectsCardData } from './projects';

export interface Metrics extends ProjectsCardData {
  uniqueness?: {
    score: number;
  };
  social_impact?: {
    has_impact: boolean;
  };
  environmental_impact?: {
    has_impact: boolean;
  };
  sdg?: {
    sdg_rank: number;
  };
  completeness?: {
    is_complete: boolean;
  };
  activity?: {
    activity_rank: number;
  };
}
