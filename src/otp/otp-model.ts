import { Table, Column, Model, CreatedAt } from "sequelize-typescript";

@Table({ tableName: "otp_table" })
class OTP extends Model {
  @Column({
    allowNull: false,
  })
  email!: string;
  @Column({
    allowNull: false,
  })
 declare otp: string;

  @CreatedAt
  @Column({
    allowNull: false,
  })
 declare created_at: Date;

  @Column({
    allowNull: false,
  })
  declare expires_at: Date;
}
export default OTP;