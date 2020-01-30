"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MEMBER"] = "member";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
let User = class User {
    generateUuuid() {
        this.id = new Date().getTime();
    }
};
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "generateUuuid", null);
__decorate([
    typeorm_1.PrimaryColumn({
        type: 'varchar',
        length: 50,
        nullable: false
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 50,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 50,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 50,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 50,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "telp", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: UserRole,
        nullable: false,
        default: UserRole.MEMBER
    }),
    __metadata("design:type", String)
], User.prototype, "level", void 0);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=users.js.map