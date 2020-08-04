import { Request, Response } from "express";
import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHours";

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async create(req: Request, res: Response) {
        const {
            name, avatar, whatsapp, bio, subject, cost, schedule
        } = req.body;

        const trx = await db.transaction();

        try {
            const user_ids = await trx("users").insert({
                name,
                avatar,
                whatsapp,
                bio
            })

            const user_id = user_ids[0];

            const class_ids = await trx("classes").insert({
                subject,
                cost,
                user_id
            })

            const class_id = class_ids[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id
                }
            })

            await trx("class_schedule").insert(classSchedule)

            await trx.commit();

            return res.status(201).send()
        } catch (err) {
            await trx.rollback()

            return res.status(400).json({
                error: "Unexpected error while creating new class"
            })
        }
    }
}