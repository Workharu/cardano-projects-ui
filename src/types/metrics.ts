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
    id: string;
    sdg_name: string;
    sdg_description: string;
    sdg_confidence: number;
    sdg_rank: number;
  };
  activity?: {
    activity_rank: number;
  };
}
