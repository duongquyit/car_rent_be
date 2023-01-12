export const REVIEW_LIMIT_DEFAULT = 2;
export const REVIEW_OFFSET_DEFAULT = 0;

export const REVIEW_SELECT_COLS = [
  'reviews.id',
  'reviews.content',
  'reviews.stars',
  'reviews.created_at',
  'user.id',
  'user.first_name',
  'user.last_name',
  'user.avatar_path',
  'user.position',
];
