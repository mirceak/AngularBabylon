interface IBaseController {
  Entity: any;

  getRouter();

  getAll(req, res);

  count(req, res);

  insert(req, res);

  get(req, res);

  update(req, res);

  delete(req, res);
}

export default IBaseController;
