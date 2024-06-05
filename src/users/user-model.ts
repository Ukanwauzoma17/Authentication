import {
  AllowNull,
  Column,
  IsEmail,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";

@Table({ tableName: "users" })
class User extends Model {
  @AllowNull(false)
  @Column
  declare firstName: string;

  @AllowNull(false)
  @Column
  declare lastName: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare password: string;

  @AllowNull(false)
  @Column
  declare phoneNumber: string;

  @Column
  declare loginAttempts: number;

  @Column
  declare locked: boolean;
}

export default User;
