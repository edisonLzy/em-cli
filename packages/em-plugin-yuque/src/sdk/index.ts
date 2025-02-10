import RawSDK from '@yuque/sdk';

export interface AppendOptions {
  target_uuid: string | null;
  doc_ids: string[];
}
class TOC {
  constructor(private client: any) {
    this.client = client;
  }
  /**
   * 创建目录结构
   */
  async setDocToSpecToc({
    namespace,
    data,
  }: {
    namespace: string;
    data: AppendOptions;
  }) {
    console.assert(namespace);
    return this.client.request(`repos/${namespace}/toc`, {
      method: 'PUT',
      data: {
        action: 'prependByDocs',
        ...data,
      },
    });
  }
  /**
   * 获取目录列表
   */
  async getList(namespace: string) {
    console.assert(namespace);
    return this.client.request(`repos/${namespace}/toc`, {
      method: 'GET',
    });
  }
}

export class SDK extends RawSDK {
  toc: TOC;
  constructor(options: any) {
    super(options);
    this.toc = new TOC(this._client);
  }
}
