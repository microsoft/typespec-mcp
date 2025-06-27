import { ChangeStatus, CreateGist, CreateGistFile, FullRepository, Gist, GistCommit, GistFile, License, SimpleUser } from "../models.js";

export function decodeBase64(value: string): Uint8Array | undefined {
  if(!value) {
    return value as any;
  }
  // Normalize Base64URL to Base64
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
    .padEnd(value.length + (4 - (value.length % 4)) % 4, '=');

  return new Uint8Array(Buffer.from(base64, 'base64'));
}export function encodeUint8Array(
  value: Uint8Array | undefined | null,
  encoding: BufferEncoding,
): string | undefined {
  if (!value) {
    return value as any;
  }
  return Buffer.from(value).toString(encoding);
}export function dateDeserializer(date?: string | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date);
}export function dateRfc7231Deserializer(date?: string | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date);
}export function dateRfc3339Serializer(date?: Date | null): string {
  if (!date) {
    return date as any
  }

  return date.toISOString();
}export function dateRfc7231Serializer(date?: Date | null): string {
  if (!date) {
    return date as any;
  }

  return date.toUTCString();
}export function dateUnixTimestampSerializer(date?: Date | null): number {
  if (!date) {
    return date as any;
  }

  return Math.floor(date.getTime() / 1000);
}export function dateUnixTimestampDeserializer(date?: number | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date * 1000);
}export function createPayloadToTransport(payload: CreateGist) {
  return jsonCreateGistToTransportTransform(payload)!;
}export function updatePayloadToTransport(payload: CreateGist) {
  return jsonCreateGistToTransportTransform(payload)!;
}export function jsonArrayGistToTransportTransform(
  items_?: Array<Gist> | null,
): any {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonGistToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayGistToApplicationTransform(
  items_?: any,
): Array<Gist> {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonGistToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonGistToTransportTransform(input_?: Gist | null): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    id: input_.id,url: input_.url,public: input_.public_,description: input_.description,comments: input_.comments,user: input_.user,files: jsonRecordGistFileToTransportTransform(input_.files),owner: jsonSimpleUserToTransportTransform(input_.owner),truncated: input_.truncated
  }!;
}export function jsonGistToApplicationTransform(input_?: any): Gist {
  if(!input_) {
    return input_ as any;
  }
    return {
    id: input_.id,url: input_.url,public_: input_.public,description: input_.description,comments: input_.comments,user: input_.user,files: jsonRecordGistFileToApplicationTransform(input_.files),owner: jsonSimpleUserToApplicationTransform(input_.owner),truncated: input_.truncated
  }!;
}export function jsonRecordGistFileToTransportTransform(
  items_?: Record<string, any> | null,
): any {
  if(!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = jsonGistFileToTransportTransform(value as any);
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}export function jsonRecordGistFileToApplicationTransform(
  items_?: any,
): Record<string, any> {
  if(!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = jsonGistFileToApplicationTransform(value as any);
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}export function jsonGistFileToTransportTransform(
  input_?: GistFile | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    filename: input_.filename,type: input_.type,language: input_.language,raw_url: input_.rawUrl,size: input_.size,encoding: input_.encoding
  }!;
}export function jsonGistFileToApplicationTransform(input_?: any): GistFile {
  if(!input_) {
    return input_ as any;
  }
    return {
    filename: input_.filename,type: input_.type,language: input_.language,rawUrl: input_.raw_url,size: input_.size,encoding: input_.encoding
  }!;
}export function jsonSimpleUserToTransportTransform(
  input_?: SimpleUser | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    name: input_.name,email: input_.email,login: input_.login,id: input_.id
  }!;
}export function jsonSimpleUserToApplicationTransform(
  input_?: any,
): SimpleUser {
  if(!input_) {
    return input_ as any;
  }
    return {
    name: input_.name,email: input_.email,login: input_.login,id: input_.id
  }!;
}export function jsonCreateGistToTransportTransform(
  input_?: CreateGist | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    description: input_.description,public: input_.public_,files: jsonRecordCreateGistFileToTransportTransform(input_.files)
  }!;
}export function jsonCreateGistToApplicationTransform(
  input_?: any,
): CreateGist {
  if(!input_) {
    return input_ as any;
  }
    return {
    description: input_.description,public_: input_.public,files: jsonRecordCreateGistFileToApplicationTransform(input_.files)
  }!;
}export function jsonRecordCreateGistFileToTransportTransform(
  items_?: Record<string, any> | null,
): any {
  if(!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = jsonCreateGistFileToTransportTransform(value as any);
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}export function jsonRecordCreateGistFileToApplicationTransform(
  items_?: any,
): Record<string, any> {
  if(!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = jsonCreateGistFileToApplicationTransform(value as any);
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}export function jsonCreateGistFileToTransportTransform(
  input_?: CreateGistFile | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    content: input_.content
  }!;
}export function jsonCreateGistFileToApplicationTransform(
  input_?: any,
): CreateGistFile {
  if(!input_) {
    return input_ as any;
  }
    return {
    content: input_.content
  }!;
}export function jsonArrayGistCommitToTransportTransform(
  items_?: Array<GistCommit> | null,
): any {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonGistCommitToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayGistCommitToApplicationTransform(
  items_?: any,
): Array<GistCommit> {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonGistCommitToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonGistCommitToTransportTransform(
  input_?: GistCommit | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    url: input_.url,version: input_.version,user: jsonSimpleUserToTransportTransform(input_.user),change_status: jsonChangeStatusToTransportTransform(input_.changeStatus),committed_at: input_.committedAt
  }!;
}export function jsonGistCommitToApplicationTransform(
  input_?: any,
): GistCommit {
  if(!input_) {
    return input_ as any;
  }
    return {
    url: input_.url,version: input_.version,user: jsonSimpleUserToApplicationTransform(input_.user),changeStatus: jsonChangeStatusToApplicationTransform(input_.change_status),committedAt: input_.committed_at
  }!;
}export function jsonChangeStatusToTransportTransform(
  input_?: ChangeStatus | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    total: input_.total,additions: input_.additions,deletions: input_.deletions
  }!;
}export function jsonChangeStatusToApplicationTransform(
  input_?: any,
): ChangeStatus {
  if(!input_) {
    return input_ as any;
  }
    return {
    total: input_.total,additions: input_.additions,deletions: input_.deletions
  }!;
}export function jsonFullRepositoryToTransportTransform(
  input_?: FullRepository | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    id: input_.id,node_id: input_.nodeId,name: input_.name,full_name: input_.fullName,owner: jsonSimpleUserToTransportTransform(input_.owner),private: input_.private_,html_url: input_.htmlUrl,description: input_.description,fork: input_.fork,url: input_.url,archive_url: input_.archiveUrl,assignees_url: input_.assigneesUrl,blobs_url: input_.blobsUrl,branches_url: input_.branchesUrl,collaborators_url: input_.collaboratorsUrl,comments_url: input_.commentsUrl,commits_url: input_.commitsUrl,compare_url: input_.compareUrl,contents_url: input_.contentsUrl,contributors_url: input_.contributorsUrl,deployments_url: input_.deploymentsUrl,downloads_url: input_.downloadsUrl,events_url: input_.eventsUrl,forks_url: input_.forksUrl,git_commits_url: input_.gitCommitsUrl,git_refs_url: input_.gitRefsUrl,git_tags_url: input_.gitTagsUrl,git_url: input_.gitUrl,issue_comment_url: input_.issueCommentUrl,issue_events_url: input_.issueEventsUrl,issues_url: input_.issuesUrl,keys_url: input_.keysUrl,labels_url: input_.labelsUrl,languages_url: input_.languagesUrl,merges_url: input_.mergesUrl,milestones_url: input_.milestonesUrl,notifications_url: input_.notificationsUrl,pulls_url: input_.pullsUrl,releases_url: input_.releasesUrl,ssh_url: input_.sshUrl,stargazers_url: input_.stargazersUrl,statuses_url: input_.statusesUrl,subscribers_url: input_.subscribersUrl,subscription_url: input_.subscriptionUrl,tags_url: input_.tagsUrl,teams_url: input_.teamsUrl,trees_url: input_.treesUrl,clone_url: input_.cloneUrl,mirror_url: input_.mirrorUrl,hooks_url: input_.hooksUrl,svn_url: input_.svnUrl,homepage: input_.homepage,language: input_.language,forks_count: input_.forksCount,stargazers_count: input_.stargazersCount,watchers_count: input_.watchersCount,size: input_.size,default_branch: input_.defaultBranch,open_issues_count: input_.openIssuesCount,is_template: input_.isTemplate,topics: jsonArrayStringToTransportTransform(input_.topics),has_issues: input_.hasIssues,has_projects: input_.hasProjects,has_wiki: input_.hasWiki,has_pages: input_.hasPages,has_downloads: input_.hasDownloads,archived: input_.archived,disabled: input_.disabled,visibility: input_.visibility,pushed_at: input_.pushedAt,created_at: input_.createdAt,updated_at: input_.updatedAt,license: jsonLicenseToTransportTransform(input_.license)
  }!;
}export function jsonFullRepositoryToApplicationTransform(
  input_?: any,
): FullRepository {
  if(!input_) {
    return input_ as any;
  }
    return {
    id: input_.id,nodeId: input_.node_id,name: input_.name,fullName: input_.full_name,owner: jsonSimpleUserToApplicationTransform(input_.owner),private_: input_.private,htmlUrl: input_.html_url,description: input_.description,fork: input_.fork,url: input_.url,archiveUrl: input_.archive_url,assigneesUrl: input_.assignees_url,blobsUrl: input_.blobs_url,branchesUrl: input_.branches_url,collaboratorsUrl: input_.collaborators_url,commentsUrl: input_.comments_url,commitsUrl: input_.commits_url,compareUrl: input_.compare_url,contentsUrl: input_.contents_url,contributorsUrl: input_.contributors_url,deploymentsUrl: input_.deployments_url,downloadsUrl: input_.downloads_url,eventsUrl: input_.events_url,forksUrl: input_.forks_url,gitCommitsUrl: input_.git_commits_url,gitRefsUrl: input_.git_refs_url,gitTagsUrl: input_.git_tags_url,gitUrl: input_.git_url,issueCommentUrl: input_.issue_comment_url,issueEventsUrl: input_.issue_events_url,issuesUrl: input_.issues_url,keysUrl: input_.keys_url,labelsUrl: input_.labels_url,languagesUrl: input_.languages_url,mergesUrl: input_.merges_url,milestonesUrl: input_.milestones_url,notificationsUrl: input_.notifications_url,pullsUrl: input_.pulls_url,releasesUrl: input_.releases_url,sshUrl: input_.ssh_url,stargazersUrl: input_.stargazers_url,statusesUrl: input_.statuses_url,subscribersUrl: input_.subscribers_url,subscriptionUrl: input_.subscription_url,tagsUrl: input_.tags_url,teamsUrl: input_.teams_url,treesUrl: input_.trees_url,cloneUrl: input_.clone_url,mirrorUrl: input_.mirror_url,hooksUrl: input_.hooks_url,svnUrl: input_.svn_url,homepage: input_.homepage,language: input_.language,forksCount: input_.forks_count,stargazersCount: input_.stargazers_count,watchersCount: input_.watchers_count,size: input_.size,defaultBranch: input_.default_branch,openIssuesCount: input_.open_issues_count,isTemplate: input_.is_template,topics: jsonArrayStringToApplicationTransform(input_.topics),hasIssues: input_.has_issues,hasProjects: input_.has_projects,hasWiki: input_.has_wiki,hasPages: input_.has_pages,hasDownloads: input_.has_downloads,archived: input_.archived,disabled: input_.disabled,visibility: input_.visibility,pushedAt: input_.pushed_at,createdAt: input_.created_at,updatedAt: input_.updated_at,license: jsonLicenseToApplicationTransform(input_.license)
  }!;
}export function jsonArrayStringToTransportTransform(
  items_?: Array<string> | null,
): any {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayStringToApplicationTransform(
  items_?: any,
): Array<string> {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonLicenseToTransportTransform(input_?: License | null): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    key: input_.key,name: input_.name,spdx_id: input_.spdxId,url: input_.url
  }!;
}export function jsonLicenseToApplicationTransform(input_?: any): License {
  if(!input_) {
    return input_ as any;
  }
    return {
    key: input_.key,name: input_.name,spdxId: input_.spdx_id,url: input_.url
  }!;
}