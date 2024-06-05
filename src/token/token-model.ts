import { Table, Column, Model, CreatedAt } from "sequelize-typescript";

@Table({ tableName: "token_table" })
class Token extends Model {
  @Column
  declare email: string;

  @Column({
    allowNull: false,
  })
  declare token: string;
  
  @Column
  declare phoneNumber: string;

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
export default Token;
