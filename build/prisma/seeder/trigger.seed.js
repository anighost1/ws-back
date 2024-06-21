"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const trigger = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRaw `
        CREATE OR REPLACE FUNCTION notify_number_changes() RETURNS trigger AS $$
        BEGIN
          PERFORM pg_notify('number_changes', NEW.id::text);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `;
    // Create the trigger on the Number table
    yield prisma.$executeRaw `
            CREATE TRIGGER number_changes_trigger
            AFTER INSERT OR UPDATE OR DELETE ON "number"
            FOR EACH ROW EXECUTE FUNCTION notify_number_changes();
          `;
});
exports.default = trigger;
