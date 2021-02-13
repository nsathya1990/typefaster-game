export default class GameDetails {
  sentence: string;
  'user-slots': {
    available: boolean;
  };
  users: [string];
  winner?: {
    name: string;
    'time-taken': number;
  };
}
