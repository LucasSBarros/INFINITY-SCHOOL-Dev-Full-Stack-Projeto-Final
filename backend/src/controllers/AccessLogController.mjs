import { accessLogSchema } from "../schemas/AccessLogSchema.mjs";
import AccessLogService from "../services/AcessLogService.mjs";

export default class AccessLogController {
  async create(req, res) {
    const data = accessLogSchema.parse(req.body);
    const created = await AccessLogService.create(data);
    res.status(201).send(created);
  }

  async list(req, res) {
    const logs = await AccessLogService.list();
    res.send(logs);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const log = await AccessLogService.findById(id);
    res.send(log);
  }

  async delete(req, res) {
    const { id } = req.params;
    await AccessLogService.remove(id);
    res.send({ message: "Access log deleted" });
  }
}
