import axios, { AxiosResponse } from 'axios';

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH',
}

// http://httpstat.us
// export default class HttpUtility {

//   public async get(endpoint: string): Promise<AxiosResponse<any>> {
//     const request = new Request(endpoint, {
//       method: RequestMethod.Get,
//     });

//     return this._fetch(request);
//   }

//   // TODO: finish setting up
//   public async post(endpoint: string): Promise<AxiosResponse<any>> {
//     const request = new Request(endpoint, {
//       method: RequestMethod.Post,
//     });

//     return this._fetch(request);
//   }

//   // TODO: finish setting up
//   public async put(endpoint: string): Promise<AxiosResponse<any>> {
//     const request = new Request(endpoint, {
//       method: RequestMethod.Put,
//     });

//     return this._fetch(request);
//   }

//   // TODO: finish setting up
//   public async delete(endpoint: string): Promise<AxiosResponse<any>> {
//     const request = new Request(endpoint, {
//       method: RequestMethod.Delete,
//     });

//     return this._fetch(request);
//   }

//   private async _fetch(request: Request, init?: any): Promise<AxiosResponse<any>> {
//     try {
//       return await axios({
//         data: init,
//         method: request.method,
//         url: request.url,
//       });
//     } catch (error) {
//       console.log(`error`, error);
//       return error;
//     }
//   }
// }