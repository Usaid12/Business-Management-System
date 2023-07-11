import { IRes, IReq } from '@src/routes/types/express/misc';

export async function getAll(req: IReq, res: IRes) {
  // const users = await UserService.getAll();
  // return res.status(HttpStatusCodes.OK).json({ users });
}

export async function add(req: IReq, res: IRes) {
  // const { user } = req.body;
  // await UserService.addOne(user);
  // return res.status(HttpStatusCodes.CREATED).end();
}

export async function update(req: IReq, res: IRes) {
  // const { user } = req.body;
  // await UserService.updateOne(user);
  // return res.status(HttpStatusCodes.OK).end();
}


export async function delete_(req: IReq, res: IRes) {
  // const id = +req.params.id;
  // await UserService.delete(id);
  // return res.status(HttpStatusCodes.OK).end();
}
