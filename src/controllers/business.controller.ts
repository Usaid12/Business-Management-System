import { generatePassword } from '@src/util/GeneratePassword';
import UserSerivce  from '@src/services/user.service';
import BusinessService from '@src/services/business.service';
import { CreateBusinessPayload } from '@src/validators/business.validator';
import { Roles } from '@src/constants/roles';
import { withTransaction } from '@src/util/withTransaction';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { getLocals } from '@src/util/locals';
import { Business } from '@src/entities/business.entity';
import { RouteError } from '@src/other/classes';

export const createBusiness = withTransaction(async (manager, req) => {
  const data = req.body as CreateBusinessPayload;
  const password = generatePassword(8);
  const userSerivce = new UserSerivce(manager);
  const businessService = new BusinessService(manager);
  const user = await userSerivce.create({ ...data.user, password, role: Roles.BUSINESS_ADMIN });
  const business = await businessService.create({
    ...data.business,
    owner_id: user.id,
  });
  return {
    data: {
      business,
      user: {
        ...user,
        password: undefined,
      },
    },
    message: 'Business Created Successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});

export const getBusinesses = withTransaction(async (manager, req, res) => {
  const payload = getLocals(res.locals, 'payload');
  const data: Business[] = [];
  const businessService = new BusinessService(manager);
  if (payload.role === Roles.BUSINESS_ADMIN) {
    const myBusiness = await businessService.findByOwner(payload.userId);
    if (!myBusiness) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'You haven\'t created your business');
    }
    data.push(myBusiness);
  } else if (payload.role === Roles.SUPER_ADMIN || payload.role === Roles.CUSTOMER) {
    const businesses = await businessService.findAll();
    data.push(...businesses);
  }
  return {
    data,
    message: 'Business List',
    statusCode: HttpStatusCodes.OK,
  };
});

export const updateBusinesses = withTransaction(async (manager, req, res) => {
  const id = parseInt(req.params.id, 10);
  const data: any[] = [];
  const businessService = new BusinessService(manager);
  const updateBusinesses = await businessService.update(id);
  return {
    data : updateBusinesses ,
    message: 'Business Updated',
    statusCode: HttpStatusCodes.OK,
  };
});