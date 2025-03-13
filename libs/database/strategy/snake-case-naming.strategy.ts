import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class SnakeCaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(className: string, customName: string): string {
    return customName ? customName : this.snakeCase(className);
  }

  columnName(propertyName: string, customName: string): string {
    return this.snakeCase(customName || propertyName);
  }

  relationName(propertyName: string): string {
    return this.snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return this.snakeCase(relationName + '_' + referencedColumnName);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
  ): string {
    return this.snakeCase(
      firstTableName +
        '_' +
        firstPropertyName.replace(/\./gi, '_') +
        '_' +
        secondTableName,
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return this.snakeCase(
      tableName + '_' + (columnName ? columnName : propertyName),
    );
  }

  private snakeCase(name: string): string {
    return name
      .replace(/([a-z])([A-Z])/g, (_, a, b) => a + '_' + b.toLowerCase())
      .toLowerCase();
  }
}
