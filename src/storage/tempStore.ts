type IssueDraft = {
  title: string;
  body: string;
};

const issueDrafts = new Map<string, IssueDraft>();

export function saveDraft(userId: string, draft: IssueDraft) {
  issueDrafts.set(userId, draft);
}

export function getDraft(userId: string): IssueDraft | undefined {
  return issueDrafts.get(userId);
}

export function clearDraft(userId: string) {
  issueDrafts.delete(userId);
}
