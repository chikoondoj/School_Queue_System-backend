
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model QueueEntry
 * 
 */
export type QueueEntry = $Result.DefaultSelection<Prisma.$QueueEntryPayload>
/**
 * Model QueueHistory
 * 
 */
export type QueueHistory = $Result.DefaultSelection<Prisma.$QueueHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
};

export type Role = (typeof Role)[keyof typeof Role]


export const QueueStatus: {
  WAITING: 'WAITING',
  BEING_SERVED: 'BEING_SERVED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

export type QueueStatus = (typeof QueueStatus)[keyof typeof QueueStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type QueueStatus = $Enums.QueueStatus

export const QueueStatus: typeof $Enums.QueueStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queueEntry`: Exposes CRUD operations for the **QueueEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueueEntries
    * const queueEntries = await prisma.queueEntry.findMany()
    * ```
    */
  get queueEntry(): Prisma.QueueEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queueHistory`: Exposes CRUD operations for the **QueueHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueueHistories
    * const queueHistories = await prisma.queueHistory.findMany()
    * ```
    */
  get queueHistory(): Prisma.QueueHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Service: 'Service',
    QueueEntry: 'QueueEntry',
    QueueHistory: 'QueueHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "service" | "queueEntry" | "queueHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      QueueEntry: {
        payload: Prisma.$QueueEntryPayload<ExtArgs>
        fields: Prisma.QueueEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          findFirst: {
            args: Prisma.QueueEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          findMany: {
            args: Prisma.QueueEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>[]
          }
          create: {
            args: Prisma.QueueEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          createMany: {
            args: Prisma.QueueEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>[]
          }
          delete: {
            args: Prisma.QueueEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          update: {
            args: Prisma.QueueEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          deleteMany: {
            args: Prisma.QueueEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueueEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>[]
          }
          upsert: {
            args: Prisma.QueueEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          aggregate: {
            args: Prisma.QueueEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueueEntry>
          }
          groupBy: {
            args: Prisma.QueueEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueEntryCountArgs<ExtArgs>
            result: $Utils.Optional<QueueEntryCountAggregateOutputType> | number
          }
        }
      }
      QueueHistory: {
        payload: Prisma.$QueueHistoryPayload<ExtArgs>
        fields: Prisma.QueueHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>
          }
          findFirst: {
            args: Prisma.QueueHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>
          }
          findMany: {
            args: Prisma.QueueHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>[]
          }
          create: {
            args: Prisma.QueueHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>
          }
          createMany: {
            args: Prisma.QueueHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>[]
          }
          delete: {
            args: Prisma.QueueHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>
          }
          update: {
            args: Prisma.QueueHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>
          }
          deleteMany: {
            args: Prisma.QueueHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueueHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>[]
          }
          upsert: {
            args: Prisma.QueueHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueHistoryPayload>
          }
          aggregate: {
            args: Prisma.QueueHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueueHistory>
          }
          groupBy: {
            args: Prisma.QueueHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<QueueHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    service?: ServiceOmit
    queueEntry?: QueueEntryOmit
    queueHistory?: QueueHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    queueEntries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queueEntries?: boolean | UserCountOutputTypeCountQueueEntriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQueueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueEntryWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    queueEntries: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queueEntries?: boolean | ServiceCountOutputTypeCountQueueEntriesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountQueueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueEntryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    year: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    year: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    studentCode: string | null
    email: string | null
    password: string | null
    name: string | null
    course: string | null
    year: number | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    studentCode: string | null
    email: string | null
    password: string | null
    name: string | null
    course: string | null
    year: number | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    studentCode: number
    email: number
    password: number
    name: number
    course: number
    year: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    year?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    year?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    studentCode?: true
    email?: true
    password?: true
    name?: true
    course?: true
    year?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    studentCode?: true
    email?: true
    password?: true
    name?: true
    course?: true
    year?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    studentCode?: true
    email?: true
    password?: true
    name?: true
    course?: true
    year?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    studentCode: string
    email: string | null
    password: string
    name: string
    course: string
    year: number
    role: $Enums.Role
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentCode?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    course?: boolean
    year?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    queueEntries?: boolean | User$queueEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentCode?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    course?: boolean
    year?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentCode?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    course?: boolean
    year?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    studentCode?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    course?: boolean
    year?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentCode" | "email" | "password" | "name" | "course" | "year" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queueEntries?: boolean | User$queueEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      queueEntries: Prisma.$QueueEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentCode: string
      email: string | null
      password: string
      name: string
      course: string
      year: number
      role: $Enums.Role
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    queueEntries<T extends User$queueEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$queueEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly studentCode: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly course: FieldRef<"User", 'String'>
    readonly year: FieldRef<"User", 'Int'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.queueEntries
   */
  export type User$queueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    where?: QueueEntryWhereInput
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    cursor?: QueueEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    id: number | null
  }

  export type ServiceSumAggregateOutputType = {
    id: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    id?: true
  }

  export type ServiceSumAggregateInputType = {
    id?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: number
    name: string
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    queueEntries?: boolean | Service$queueEntriesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queueEntries?: boolean | Service$queueEntriesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      queueEntries: Prisma.$QueueEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    queueEntries<T extends Service$queueEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Service$queueEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'Int'>
    readonly name: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly isActive: FieldRef<"Service", 'Boolean'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.queueEntries
   */
  export type Service$queueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    where?: QueueEntryWhereInput
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    cursor?: QueueEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model QueueEntry
   */

  export type AggregateQueueEntry = {
    _count: QueueEntryCountAggregateOutputType | null
    _avg: QueueEntryAvgAggregateOutputType | null
    _sum: QueueEntrySumAggregateOutputType | null
    _min: QueueEntryMinAggregateOutputType | null
    _max: QueueEntryMaxAggregateOutputType | null
  }

  export type QueueEntryAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    positionNumber: number | null
    priority: number | null
    estimatedTime: number | null
    actualWaitTime: number | null
  }

  export type QueueEntrySumAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    positionNumber: number | null
    priority: number | null
    estimatedTime: number | null
    actualWaitTime: number | null
  }

  export type QueueEntryMinAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    positionNumber: number | null
    status: $Enums.QueueStatus | null
    priority: number | null
    estimatedTime: number | null
    actualWaitTime: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    servedAt: Date | null
    completedAt: Date | null
  }

  export type QueueEntryMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    positionNumber: number | null
    status: $Enums.QueueStatus | null
    priority: number | null
    estimatedTime: number | null
    actualWaitTime: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    servedAt: Date | null
    completedAt: Date | null
  }

  export type QueueEntryCountAggregateOutputType = {
    id: number
    userId: number
    serviceId: number
    positionNumber: number
    status: number
    priority: number
    estimatedTime: number
    actualWaitTime: number
    notes: number
    createdAt: number
    updatedAt: number
    servedAt: number
    completedAt: number
    _all: number
  }


  export type QueueEntryAvgAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    positionNumber?: true
    priority?: true
    estimatedTime?: true
    actualWaitTime?: true
  }

  export type QueueEntrySumAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    positionNumber?: true
    priority?: true
    estimatedTime?: true
    actualWaitTime?: true
  }

  export type QueueEntryMinAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    positionNumber?: true
    status?: true
    priority?: true
    estimatedTime?: true
    actualWaitTime?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    servedAt?: true
    completedAt?: true
  }

  export type QueueEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    positionNumber?: true
    status?: true
    priority?: true
    estimatedTime?: true
    actualWaitTime?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    servedAt?: true
    completedAt?: true
  }

  export type QueueEntryCountAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    positionNumber?: true
    status?: true
    priority?: true
    estimatedTime?: true
    actualWaitTime?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    servedAt?: true
    completedAt?: true
    _all?: true
  }

  export type QueueEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueEntry to aggregate.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueueEntries
    **/
    _count?: true | QueueEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueueEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueueEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueEntryMaxAggregateInputType
  }

  export type GetQueueEntryAggregateType<T extends QueueEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateQueueEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueueEntry[P]>
      : GetScalarType<T[P], AggregateQueueEntry[P]>
  }




  export type QueueEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueEntryWhereInput
    orderBy?: QueueEntryOrderByWithAggregationInput | QueueEntryOrderByWithAggregationInput[]
    by: QueueEntryScalarFieldEnum[] | QueueEntryScalarFieldEnum
    having?: QueueEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueEntryCountAggregateInputType | true
    _avg?: QueueEntryAvgAggregateInputType
    _sum?: QueueEntrySumAggregateInputType
    _min?: QueueEntryMinAggregateInputType
    _max?: QueueEntryMaxAggregateInputType
  }

  export type QueueEntryGroupByOutputType = {
    id: number
    userId: number
    serviceId: number
    positionNumber: number
    status: $Enums.QueueStatus
    priority: number
    estimatedTime: number | null
    actualWaitTime: number | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    servedAt: Date | null
    completedAt: Date | null
    _count: QueueEntryCountAggregateOutputType | null
    _avg: QueueEntryAvgAggregateOutputType | null
    _sum: QueueEntrySumAggregateOutputType | null
    _min: QueueEntryMinAggregateOutputType | null
    _max: QueueEntryMaxAggregateOutputType | null
  }

  type GetQueueEntryGroupByPayload<T extends QueueEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueEntryGroupByOutputType[P]>
            : GetScalarType<T[P], QueueEntryGroupByOutputType[P]>
        }
      >
    >


  export type QueueEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    positionNumber?: boolean
    status?: boolean
    priority?: boolean
    estimatedTime?: boolean
    actualWaitTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    servedAt?: boolean
    completedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueEntry"]>

  export type QueueEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    positionNumber?: boolean
    status?: boolean
    priority?: boolean
    estimatedTime?: boolean
    actualWaitTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    servedAt?: boolean
    completedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueEntry"]>

  export type QueueEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    positionNumber?: boolean
    status?: boolean
    priority?: boolean
    estimatedTime?: boolean
    actualWaitTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    servedAt?: boolean
    completedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueEntry"]>

  export type QueueEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    positionNumber?: boolean
    status?: boolean
    priority?: boolean
    estimatedTime?: boolean
    actualWaitTime?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    servedAt?: boolean
    completedAt?: boolean
  }

  export type QueueEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "serviceId" | "positionNumber" | "status" | "priority" | "estimatedTime" | "actualWaitTime" | "notes" | "createdAt" | "updatedAt" | "servedAt" | "completedAt", ExtArgs["result"]["queueEntry"]>
  export type QueueEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QueueEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QueueEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QueueEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueueEntry"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      serviceId: number
      positionNumber: number
      status: $Enums.QueueStatus
      priority: number
      estimatedTime: number | null
      actualWaitTime: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      servedAt: Date | null
      completedAt: Date | null
    }, ExtArgs["result"]["queueEntry"]>
    composites: {}
  }

  type QueueEntryGetPayload<S extends boolean | null | undefined | QueueEntryDefaultArgs> = $Result.GetResult<Prisma.$QueueEntryPayload, S>

  type QueueEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueEntryCountAggregateInputType | true
    }

  export interface QueueEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueueEntry'], meta: { name: 'QueueEntry' } }
    /**
     * Find zero or one QueueEntry that matches the filter.
     * @param {QueueEntryFindUniqueArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueEntryFindUniqueArgs>(args: SelectSubset<T, QueueEntryFindUniqueArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QueueEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueEntryFindUniqueOrThrowArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryFindFirstArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueEntryFindFirstArgs>(args?: SelectSubset<T, QueueEntryFindFirstArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryFindFirstOrThrowArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QueueEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueueEntries
     * const queueEntries = await prisma.queueEntry.findMany()
     * 
     * // Get first 10 QueueEntries
     * const queueEntries = await prisma.queueEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueEntryWithIdOnly = await prisma.queueEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueEntryFindManyArgs>(args?: SelectSubset<T, QueueEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QueueEntry.
     * @param {QueueEntryCreateArgs} args - Arguments to create a QueueEntry.
     * @example
     * // Create one QueueEntry
     * const QueueEntry = await prisma.queueEntry.create({
     *   data: {
     *     // ... data to create a QueueEntry
     *   }
     * })
     * 
     */
    create<T extends QueueEntryCreateArgs>(args: SelectSubset<T, QueueEntryCreateArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QueueEntries.
     * @param {QueueEntryCreateManyArgs} args - Arguments to create many QueueEntries.
     * @example
     * // Create many QueueEntries
     * const queueEntry = await prisma.queueEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueEntryCreateManyArgs>(args?: SelectSubset<T, QueueEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueueEntries and returns the data saved in the database.
     * @param {QueueEntryCreateManyAndReturnArgs} args - Arguments to create many QueueEntries.
     * @example
     * // Create many QueueEntries
     * const queueEntry = await prisma.queueEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueueEntries and only return the `id`
     * const queueEntryWithIdOnly = await prisma.queueEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QueueEntry.
     * @param {QueueEntryDeleteArgs} args - Arguments to delete one QueueEntry.
     * @example
     * // Delete one QueueEntry
     * const QueueEntry = await prisma.queueEntry.delete({
     *   where: {
     *     // ... filter to delete one QueueEntry
     *   }
     * })
     * 
     */
    delete<T extends QueueEntryDeleteArgs>(args: SelectSubset<T, QueueEntryDeleteArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QueueEntry.
     * @param {QueueEntryUpdateArgs} args - Arguments to update one QueueEntry.
     * @example
     * // Update one QueueEntry
     * const queueEntry = await prisma.queueEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueEntryUpdateArgs>(args: SelectSubset<T, QueueEntryUpdateArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QueueEntries.
     * @param {QueueEntryDeleteManyArgs} args - Arguments to filter QueueEntries to delete.
     * @example
     * // Delete a few QueueEntries
     * const { count } = await prisma.queueEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueEntryDeleteManyArgs>(args?: SelectSubset<T, QueueEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueueEntries
     * const queueEntry = await prisma.queueEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueEntryUpdateManyArgs>(args: SelectSubset<T, QueueEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueEntries and returns the data updated in the database.
     * @param {QueueEntryUpdateManyAndReturnArgs} args - Arguments to update many QueueEntries.
     * @example
     * // Update many QueueEntries
     * const queueEntry = await prisma.queueEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QueueEntries and only return the `id`
     * const queueEntryWithIdOnly = await prisma.queueEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueueEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, QueueEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QueueEntry.
     * @param {QueueEntryUpsertArgs} args - Arguments to update or create a QueueEntry.
     * @example
     * // Update or create a QueueEntry
     * const queueEntry = await prisma.queueEntry.upsert({
     *   create: {
     *     // ... data to create a QueueEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueueEntry we want to update
     *   }
     * })
     */
    upsert<T extends QueueEntryUpsertArgs>(args: SelectSubset<T, QueueEntryUpsertArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QueueEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryCountArgs} args - Arguments to filter QueueEntries to count.
     * @example
     * // Count the number of QueueEntries
     * const count = await prisma.queueEntry.count({
     *   where: {
     *     // ... the filter for the QueueEntries we want to count
     *   }
     * })
    **/
    count<T extends QueueEntryCountArgs>(
      args?: Subset<T, QueueEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueueEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueEntryAggregateArgs>(args: Subset<T, QueueEntryAggregateArgs>): Prisma.PrismaPromise<GetQueueEntryAggregateType<T>>

    /**
     * Group by QueueEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueEntryGroupByArgs['orderBy'] }
        : { orderBy?: QueueEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueueEntry model
   */
  readonly fields: QueueEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueueEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueueEntry model
   */
  interface QueueEntryFieldRefs {
    readonly id: FieldRef<"QueueEntry", 'Int'>
    readonly userId: FieldRef<"QueueEntry", 'Int'>
    readonly serviceId: FieldRef<"QueueEntry", 'Int'>
    readonly positionNumber: FieldRef<"QueueEntry", 'Int'>
    readonly status: FieldRef<"QueueEntry", 'QueueStatus'>
    readonly priority: FieldRef<"QueueEntry", 'Int'>
    readonly estimatedTime: FieldRef<"QueueEntry", 'Int'>
    readonly actualWaitTime: FieldRef<"QueueEntry", 'Int'>
    readonly notes: FieldRef<"QueueEntry", 'String'>
    readonly createdAt: FieldRef<"QueueEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"QueueEntry", 'DateTime'>
    readonly servedAt: FieldRef<"QueueEntry", 'DateTime'>
    readonly completedAt: FieldRef<"QueueEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QueueEntry findUnique
   */
  export type QueueEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry findUniqueOrThrow
   */
  export type QueueEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry findFirst
   */
  export type QueueEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueEntries.
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueEntries.
     */
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * QueueEntry findFirstOrThrow
   */
  export type QueueEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueEntries.
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueEntries.
     */
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * QueueEntry findMany
   */
  export type QueueEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntries to fetch.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueueEntries.
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * QueueEntry create
   */
  export type QueueEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a QueueEntry.
     */
    data: XOR<QueueEntryCreateInput, QueueEntryUncheckedCreateInput>
  }

  /**
   * QueueEntry createMany
   */
  export type QueueEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueueEntries.
     */
    data: QueueEntryCreateManyInput | QueueEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueEntry createManyAndReturn
   */
  export type QueueEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * The data used to create many QueueEntries.
     */
    data: QueueEntryCreateManyInput | QueueEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueEntry update
   */
  export type QueueEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a QueueEntry.
     */
    data: XOR<QueueEntryUpdateInput, QueueEntryUncheckedUpdateInput>
    /**
     * Choose, which QueueEntry to update.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry updateMany
   */
  export type QueueEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueueEntries.
     */
    data: XOR<QueueEntryUpdateManyMutationInput, QueueEntryUncheckedUpdateManyInput>
    /**
     * Filter which QueueEntries to update
     */
    where?: QueueEntryWhereInput
    /**
     * Limit how many QueueEntries to update.
     */
    limit?: number
  }

  /**
   * QueueEntry updateManyAndReturn
   */
  export type QueueEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * The data used to update QueueEntries.
     */
    data: XOR<QueueEntryUpdateManyMutationInput, QueueEntryUncheckedUpdateManyInput>
    /**
     * Filter which QueueEntries to update
     */
    where?: QueueEntryWhereInput
    /**
     * Limit how many QueueEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueEntry upsert
   */
  export type QueueEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the QueueEntry to update in case it exists.
     */
    where: QueueEntryWhereUniqueInput
    /**
     * In case the QueueEntry found by the `where` argument doesn't exist, create a new QueueEntry with this data.
     */
    create: XOR<QueueEntryCreateInput, QueueEntryUncheckedCreateInput>
    /**
     * In case the QueueEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueEntryUpdateInput, QueueEntryUncheckedUpdateInput>
  }

  /**
   * QueueEntry delete
   */
  export type QueueEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter which QueueEntry to delete.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry deleteMany
   */
  export type QueueEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueEntries to delete
     */
    where?: QueueEntryWhereInput
    /**
     * Limit how many QueueEntries to delete.
     */
    limit?: number
  }

  /**
   * QueueEntry without action
   */
  export type QueueEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
  }


  /**
   * Model QueueHistory
   */

  export type AggregateQueueHistory = {
    _count: QueueHistoryCountAggregateOutputType | null
    _avg: QueueHistoryAvgAggregateOutputType | null
    _sum: QueueHistorySumAggregateOutputType | null
    _min: QueueHistoryMinAggregateOutputType | null
    _max: QueueHistoryMaxAggregateOutputType | null
  }

  export type QueueHistoryAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    waitTime: number | null
  }

  export type QueueHistorySumAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    waitTime: number | null
  }

  export type QueueHistoryMinAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    serviceName: string | null
    userName: string | null
    userCode: string | null
    waitTime: number | null
    status: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type QueueHistoryMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    serviceId: number | null
    serviceName: string | null
    userName: string | null
    userCode: string | null
    waitTime: number | null
    status: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type QueueHistoryCountAggregateOutputType = {
    id: number
    userId: number
    serviceId: number
    serviceName: number
    userName: number
    userCode: number
    waitTime: number
    status: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type QueueHistoryAvgAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    waitTime?: true
  }

  export type QueueHistorySumAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    waitTime?: true
  }

  export type QueueHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    serviceName?: true
    userName?: true
    userCode?: true
    waitTime?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type QueueHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    serviceName?: true
    userName?: true
    userCode?: true
    waitTime?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type QueueHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    serviceId?: true
    serviceName?: true
    userName?: true
    userCode?: true
    waitTime?: true
    status?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type QueueHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueHistory to aggregate.
     */
    where?: QueueHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueHistories to fetch.
     */
    orderBy?: QueueHistoryOrderByWithRelationInput | QueueHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueueHistories
    **/
    _count?: true | QueueHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueueHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueueHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueHistoryMaxAggregateInputType
  }

  export type GetQueueHistoryAggregateType<T extends QueueHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateQueueHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueueHistory[P]>
      : GetScalarType<T[P], AggregateQueueHistory[P]>
  }




  export type QueueHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueHistoryWhereInput
    orderBy?: QueueHistoryOrderByWithAggregationInput | QueueHistoryOrderByWithAggregationInput[]
    by: QueueHistoryScalarFieldEnum[] | QueueHistoryScalarFieldEnum
    having?: QueueHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueHistoryCountAggregateInputType | true
    _avg?: QueueHistoryAvgAggregateInputType
    _sum?: QueueHistorySumAggregateInputType
    _min?: QueueHistoryMinAggregateInputType
    _max?: QueueHistoryMaxAggregateInputType
  }

  export type QueueHistoryGroupByOutputType = {
    id: number
    userId: number
    serviceId: number
    serviceName: string
    userName: string
    userCode: string
    waitTime: number | null
    status: string
    createdAt: Date
    completedAt: Date
    _count: QueueHistoryCountAggregateOutputType | null
    _avg: QueueHistoryAvgAggregateOutputType | null
    _sum: QueueHistorySumAggregateOutputType | null
    _min: QueueHistoryMinAggregateOutputType | null
    _max: QueueHistoryMaxAggregateOutputType | null
  }

  type GetQueueHistoryGroupByPayload<T extends QueueHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], QueueHistoryGroupByOutputType[P]>
        }
      >
    >


  export type QueueHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    serviceName?: boolean
    userName?: boolean
    userCode?: boolean
    waitTime?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["queueHistory"]>

  export type QueueHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    serviceName?: boolean
    userName?: boolean
    userCode?: boolean
    waitTime?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["queueHistory"]>

  export type QueueHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    serviceName?: boolean
    userName?: boolean
    userCode?: boolean
    waitTime?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["queueHistory"]>

  export type QueueHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    serviceId?: boolean
    serviceName?: boolean
    userName?: boolean
    userCode?: boolean
    waitTime?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type QueueHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "serviceId" | "serviceName" | "userName" | "userCode" | "waitTime" | "status" | "createdAt" | "completedAt", ExtArgs["result"]["queueHistory"]>

  export type $QueueHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueueHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      serviceId: number
      serviceName: string
      userName: string
      userCode: string
      waitTime: number | null
      status: string
      createdAt: Date
      completedAt: Date
    }, ExtArgs["result"]["queueHistory"]>
    composites: {}
  }

  type QueueHistoryGetPayload<S extends boolean | null | undefined | QueueHistoryDefaultArgs> = $Result.GetResult<Prisma.$QueueHistoryPayload, S>

  type QueueHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueHistoryCountAggregateInputType | true
    }

  export interface QueueHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueueHistory'], meta: { name: 'QueueHistory' } }
    /**
     * Find zero or one QueueHistory that matches the filter.
     * @param {QueueHistoryFindUniqueArgs} args - Arguments to find a QueueHistory
     * @example
     * // Get one QueueHistory
     * const queueHistory = await prisma.queueHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueHistoryFindUniqueArgs>(args: SelectSubset<T, QueueHistoryFindUniqueArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QueueHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueHistoryFindUniqueOrThrowArgs} args - Arguments to find a QueueHistory
     * @example
     * // Get one QueueHistory
     * const queueHistory = await prisma.queueHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueHistoryFindFirstArgs} args - Arguments to find a QueueHistory
     * @example
     * // Get one QueueHistory
     * const queueHistory = await prisma.queueHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueHistoryFindFirstArgs>(args?: SelectSubset<T, QueueHistoryFindFirstArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueHistoryFindFirstOrThrowArgs} args - Arguments to find a QueueHistory
     * @example
     * // Get one QueueHistory
     * const queueHistory = await prisma.queueHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QueueHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueueHistories
     * const queueHistories = await prisma.queueHistory.findMany()
     * 
     * // Get first 10 QueueHistories
     * const queueHistories = await prisma.queueHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueHistoryWithIdOnly = await prisma.queueHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueHistoryFindManyArgs>(args?: SelectSubset<T, QueueHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QueueHistory.
     * @param {QueueHistoryCreateArgs} args - Arguments to create a QueueHistory.
     * @example
     * // Create one QueueHistory
     * const QueueHistory = await prisma.queueHistory.create({
     *   data: {
     *     // ... data to create a QueueHistory
     *   }
     * })
     * 
     */
    create<T extends QueueHistoryCreateArgs>(args: SelectSubset<T, QueueHistoryCreateArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QueueHistories.
     * @param {QueueHistoryCreateManyArgs} args - Arguments to create many QueueHistories.
     * @example
     * // Create many QueueHistories
     * const queueHistory = await prisma.queueHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueHistoryCreateManyArgs>(args?: SelectSubset<T, QueueHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueueHistories and returns the data saved in the database.
     * @param {QueueHistoryCreateManyAndReturnArgs} args - Arguments to create many QueueHistories.
     * @example
     * // Create many QueueHistories
     * const queueHistory = await prisma.queueHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueueHistories and only return the `id`
     * const queueHistoryWithIdOnly = await prisma.queueHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QueueHistory.
     * @param {QueueHistoryDeleteArgs} args - Arguments to delete one QueueHistory.
     * @example
     * // Delete one QueueHistory
     * const QueueHistory = await prisma.queueHistory.delete({
     *   where: {
     *     // ... filter to delete one QueueHistory
     *   }
     * })
     * 
     */
    delete<T extends QueueHistoryDeleteArgs>(args: SelectSubset<T, QueueHistoryDeleteArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QueueHistory.
     * @param {QueueHistoryUpdateArgs} args - Arguments to update one QueueHistory.
     * @example
     * // Update one QueueHistory
     * const queueHistory = await prisma.queueHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueHistoryUpdateArgs>(args: SelectSubset<T, QueueHistoryUpdateArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QueueHistories.
     * @param {QueueHistoryDeleteManyArgs} args - Arguments to filter QueueHistories to delete.
     * @example
     * // Delete a few QueueHistories
     * const { count } = await prisma.queueHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueHistoryDeleteManyArgs>(args?: SelectSubset<T, QueueHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueueHistories
     * const queueHistory = await prisma.queueHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueHistoryUpdateManyArgs>(args: SelectSubset<T, QueueHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueHistories and returns the data updated in the database.
     * @param {QueueHistoryUpdateManyAndReturnArgs} args - Arguments to update many QueueHistories.
     * @example
     * // Update many QueueHistories
     * const queueHistory = await prisma.queueHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QueueHistories and only return the `id`
     * const queueHistoryWithIdOnly = await prisma.queueHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueueHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, QueueHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QueueHistory.
     * @param {QueueHistoryUpsertArgs} args - Arguments to update or create a QueueHistory.
     * @example
     * // Update or create a QueueHistory
     * const queueHistory = await prisma.queueHistory.upsert({
     *   create: {
     *     // ... data to create a QueueHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueueHistory we want to update
     *   }
     * })
     */
    upsert<T extends QueueHistoryUpsertArgs>(args: SelectSubset<T, QueueHistoryUpsertArgs<ExtArgs>>): Prisma__QueueHistoryClient<$Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QueueHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueHistoryCountArgs} args - Arguments to filter QueueHistories to count.
     * @example
     * // Count the number of QueueHistories
     * const count = await prisma.queueHistory.count({
     *   where: {
     *     // ... the filter for the QueueHistories we want to count
     *   }
     * })
    **/
    count<T extends QueueHistoryCountArgs>(
      args?: Subset<T, QueueHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueueHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueHistoryAggregateArgs>(args: Subset<T, QueueHistoryAggregateArgs>): Prisma.PrismaPromise<GetQueueHistoryAggregateType<T>>

    /**
     * Group by QueueHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueHistoryGroupByArgs['orderBy'] }
        : { orderBy?: QueueHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueueHistory model
   */
  readonly fields: QueueHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueueHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueueHistory model
   */
  interface QueueHistoryFieldRefs {
    readonly id: FieldRef<"QueueHistory", 'Int'>
    readonly userId: FieldRef<"QueueHistory", 'Int'>
    readonly serviceId: FieldRef<"QueueHistory", 'Int'>
    readonly serviceName: FieldRef<"QueueHistory", 'String'>
    readonly userName: FieldRef<"QueueHistory", 'String'>
    readonly userCode: FieldRef<"QueueHistory", 'String'>
    readonly waitTime: FieldRef<"QueueHistory", 'Int'>
    readonly status: FieldRef<"QueueHistory", 'String'>
    readonly createdAt: FieldRef<"QueueHistory", 'DateTime'>
    readonly completedAt: FieldRef<"QueueHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QueueHistory findUnique
   */
  export type QueueHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * Filter, which QueueHistory to fetch.
     */
    where: QueueHistoryWhereUniqueInput
  }

  /**
   * QueueHistory findUniqueOrThrow
   */
  export type QueueHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * Filter, which QueueHistory to fetch.
     */
    where: QueueHistoryWhereUniqueInput
  }

  /**
   * QueueHistory findFirst
   */
  export type QueueHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * Filter, which QueueHistory to fetch.
     */
    where?: QueueHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueHistories to fetch.
     */
    orderBy?: QueueHistoryOrderByWithRelationInput | QueueHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueHistories.
     */
    cursor?: QueueHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueHistories.
     */
    distinct?: QueueHistoryScalarFieldEnum | QueueHistoryScalarFieldEnum[]
  }

  /**
   * QueueHistory findFirstOrThrow
   */
  export type QueueHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * Filter, which QueueHistory to fetch.
     */
    where?: QueueHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueHistories to fetch.
     */
    orderBy?: QueueHistoryOrderByWithRelationInput | QueueHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueHistories.
     */
    cursor?: QueueHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueHistories.
     */
    distinct?: QueueHistoryScalarFieldEnum | QueueHistoryScalarFieldEnum[]
  }

  /**
   * QueueHistory findMany
   */
  export type QueueHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * Filter, which QueueHistories to fetch.
     */
    where?: QueueHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueHistories to fetch.
     */
    orderBy?: QueueHistoryOrderByWithRelationInput | QueueHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueueHistories.
     */
    cursor?: QueueHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueHistories.
     */
    skip?: number
    distinct?: QueueHistoryScalarFieldEnum | QueueHistoryScalarFieldEnum[]
  }

  /**
   * QueueHistory create
   */
  export type QueueHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * The data needed to create a QueueHistory.
     */
    data: XOR<QueueHistoryCreateInput, QueueHistoryUncheckedCreateInput>
  }

  /**
   * QueueHistory createMany
   */
  export type QueueHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueueHistories.
     */
    data: QueueHistoryCreateManyInput | QueueHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueHistory createManyAndReturn
   */
  export type QueueHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many QueueHistories.
     */
    data: QueueHistoryCreateManyInput | QueueHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueHistory update
   */
  export type QueueHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * The data needed to update a QueueHistory.
     */
    data: XOR<QueueHistoryUpdateInput, QueueHistoryUncheckedUpdateInput>
    /**
     * Choose, which QueueHistory to update.
     */
    where: QueueHistoryWhereUniqueInput
  }

  /**
   * QueueHistory updateMany
   */
  export type QueueHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueueHistories.
     */
    data: XOR<QueueHistoryUpdateManyMutationInput, QueueHistoryUncheckedUpdateManyInput>
    /**
     * Filter which QueueHistories to update
     */
    where?: QueueHistoryWhereInput
    /**
     * Limit how many QueueHistories to update.
     */
    limit?: number
  }

  /**
   * QueueHistory updateManyAndReturn
   */
  export type QueueHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * The data used to update QueueHistories.
     */
    data: XOR<QueueHistoryUpdateManyMutationInput, QueueHistoryUncheckedUpdateManyInput>
    /**
     * Filter which QueueHistories to update
     */
    where?: QueueHistoryWhereInput
    /**
     * Limit how many QueueHistories to update.
     */
    limit?: number
  }

  /**
   * QueueHistory upsert
   */
  export type QueueHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * The filter to search for the QueueHistory to update in case it exists.
     */
    where: QueueHistoryWhereUniqueInput
    /**
     * In case the QueueHistory found by the `where` argument doesn't exist, create a new QueueHistory with this data.
     */
    create: XOR<QueueHistoryCreateInput, QueueHistoryUncheckedCreateInput>
    /**
     * In case the QueueHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueHistoryUpdateInput, QueueHistoryUncheckedUpdateInput>
  }

  /**
   * QueueHistory delete
   */
  export type QueueHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
    /**
     * Filter which QueueHistory to delete.
     */
    where: QueueHistoryWhereUniqueInput
  }

  /**
   * QueueHistory deleteMany
   */
  export type QueueHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueHistories to delete
     */
    where?: QueueHistoryWhereInput
    /**
     * Limit how many QueueHistories to delete.
     */
    limit?: number
  }

  /**
   * QueueHistory without action
   */
  export type QueueHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueHistory
     */
    select?: QueueHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueHistory
     */
    omit?: QueueHistoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    studentCode: 'studentCode',
    email: 'email',
    password: 'password',
    name: 'name',
    course: 'course',
    year: 'year',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const QueueEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    serviceId: 'serviceId',
    positionNumber: 'positionNumber',
    status: 'status',
    priority: 'priority',
    estimatedTime: 'estimatedTime',
    actualWaitTime: 'actualWaitTime',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    servedAt: 'servedAt',
    completedAt: 'completedAt'
  };

  export type QueueEntryScalarFieldEnum = (typeof QueueEntryScalarFieldEnum)[keyof typeof QueueEntryScalarFieldEnum]


  export const QueueHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    serviceId: 'serviceId',
    serviceName: 'serviceName',
    userName: 'userName',
    userCode: 'userCode',
    waitTime: 'waitTime',
    status: 'status',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type QueueHistoryScalarFieldEnum = (typeof QueueHistoryScalarFieldEnum)[keyof typeof QueueHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'QueueStatus'
   */
  export type EnumQueueStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueStatus'>
    


  /**
   * Reference to a field of type 'QueueStatus[]'
   */
  export type ListEnumQueueStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    studentCode?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    course?: StringFilter<"User"> | string
    year?: IntFilter<"User"> | number
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    queueEntries?: QueueEntryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    studentCode?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrder
    name?: SortOrder
    course?: SortOrder
    year?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    queueEntries?: QueueEntryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentCode?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    course?: StringFilter<"User"> | string
    year?: IntFilter<"User"> | number
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    queueEntries?: QueueEntryListRelationFilter
  }, "id" | "studentCode" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    studentCode?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrder
    name?: SortOrder
    course?: SortOrder
    year?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    studentCode?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    course?: StringWithAggregatesFilter<"User"> | string
    year?: IntWithAggregatesFilter<"User"> | number
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: IntFilter<"Service"> | number
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    isActive?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    queueEntries?: QueueEntryListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    queueEntries?: QueueEntryOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    description?: StringNullableFilter<"Service"> | string | null
    isActive?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    queueEntries?: QueueEntryListRelationFilter
  }, "id" | "name">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Service"> | number
    name?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    isActive?: BoolWithAggregatesFilter<"Service"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type QueueEntryWhereInput = {
    AND?: QueueEntryWhereInput | QueueEntryWhereInput[]
    OR?: QueueEntryWhereInput[]
    NOT?: QueueEntryWhereInput | QueueEntryWhereInput[]
    id?: IntFilter<"QueueEntry"> | number
    userId?: IntFilter<"QueueEntry"> | number
    serviceId?: IntFilter<"QueueEntry"> | number
    positionNumber?: IntFilter<"QueueEntry"> | number
    status?: EnumQueueStatusFilter<"QueueEntry"> | $Enums.QueueStatus
    priority?: IntFilter<"QueueEntry"> | number
    estimatedTime?: IntNullableFilter<"QueueEntry"> | number | null
    actualWaitTime?: IntNullableFilter<"QueueEntry"> | number | null
    notes?: StringNullableFilter<"QueueEntry"> | string | null
    createdAt?: DateTimeFilter<"QueueEntry"> | Date | string
    updatedAt?: DateTimeFilter<"QueueEntry"> | Date | string
    servedAt?: DateTimeNullableFilter<"QueueEntry"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"QueueEntry"> | Date | string | null
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type QueueEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    positionNumber?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    actualWaitTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    servedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    service?: ServiceOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type QueueEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QueueEntryWhereInput | QueueEntryWhereInput[]
    OR?: QueueEntryWhereInput[]
    NOT?: QueueEntryWhereInput | QueueEntryWhereInput[]
    userId?: IntFilter<"QueueEntry"> | number
    serviceId?: IntFilter<"QueueEntry"> | number
    positionNumber?: IntFilter<"QueueEntry"> | number
    status?: EnumQueueStatusFilter<"QueueEntry"> | $Enums.QueueStatus
    priority?: IntFilter<"QueueEntry"> | number
    estimatedTime?: IntNullableFilter<"QueueEntry"> | number | null
    actualWaitTime?: IntNullableFilter<"QueueEntry"> | number | null
    notes?: StringNullableFilter<"QueueEntry"> | string | null
    createdAt?: DateTimeFilter<"QueueEntry"> | Date | string
    updatedAt?: DateTimeFilter<"QueueEntry"> | Date | string
    servedAt?: DateTimeNullableFilter<"QueueEntry"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"QueueEntry"> | Date | string | null
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type QueueEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    positionNumber?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    actualWaitTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    servedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: QueueEntryCountOrderByAggregateInput
    _avg?: QueueEntryAvgOrderByAggregateInput
    _max?: QueueEntryMaxOrderByAggregateInput
    _min?: QueueEntryMinOrderByAggregateInput
    _sum?: QueueEntrySumOrderByAggregateInput
  }

  export type QueueEntryScalarWhereWithAggregatesInput = {
    AND?: QueueEntryScalarWhereWithAggregatesInput | QueueEntryScalarWhereWithAggregatesInput[]
    OR?: QueueEntryScalarWhereWithAggregatesInput[]
    NOT?: QueueEntryScalarWhereWithAggregatesInput | QueueEntryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QueueEntry"> | number
    userId?: IntWithAggregatesFilter<"QueueEntry"> | number
    serviceId?: IntWithAggregatesFilter<"QueueEntry"> | number
    positionNumber?: IntWithAggregatesFilter<"QueueEntry"> | number
    status?: EnumQueueStatusWithAggregatesFilter<"QueueEntry"> | $Enums.QueueStatus
    priority?: IntWithAggregatesFilter<"QueueEntry"> | number
    estimatedTime?: IntNullableWithAggregatesFilter<"QueueEntry"> | number | null
    actualWaitTime?: IntNullableWithAggregatesFilter<"QueueEntry"> | number | null
    notes?: StringNullableWithAggregatesFilter<"QueueEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QueueEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QueueEntry"> | Date | string
    servedAt?: DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null
  }

  export type QueueHistoryWhereInput = {
    AND?: QueueHistoryWhereInput | QueueHistoryWhereInput[]
    OR?: QueueHistoryWhereInput[]
    NOT?: QueueHistoryWhereInput | QueueHistoryWhereInput[]
    id?: IntFilter<"QueueHistory"> | number
    userId?: IntFilter<"QueueHistory"> | number
    serviceId?: IntFilter<"QueueHistory"> | number
    serviceName?: StringFilter<"QueueHistory"> | string
    userName?: StringFilter<"QueueHistory"> | string
    userCode?: StringFilter<"QueueHistory"> | string
    waitTime?: IntNullableFilter<"QueueHistory"> | number | null
    status?: StringFilter<"QueueHistory"> | string
    createdAt?: DateTimeFilter<"QueueHistory"> | Date | string
    completedAt?: DateTimeFilter<"QueueHistory"> | Date | string
  }

  export type QueueHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    serviceName?: SortOrder
    userName?: SortOrder
    userCode?: SortOrder
    waitTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QueueHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QueueHistoryWhereInput | QueueHistoryWhereInput[]
    OR?: QueueHistoryWhereInput[]
    NOT?: QueueHistoryWhereInput | QueueHistoryWhereInput[]
    userId?: IntFilter<"QueueHistory"> | number
    serviceId?: IntFilter<"QueueHistory"> | number
    serviceName?: StringFilter<"QueueHistory"> | string
    userName?: StringFilter<"QueueHistory"> | string
    userCode?: StringFilter<"QueueHistory"> | string
    waitTime?: IntNullableFilter<"QueueHistory"> | number | null
    status?: StringFilter<"QueueHistory"> | string
    createdAt?: DateTimeFilter<"QueueHistory"> | Date | string
    completedAt?: DateTimeFilter<"QueueHistory"> | Date | string
  }, "id">

  export type QueueHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    serviceName?: SortOrder
    userName?: SortOrder
    userCode?: SortOrder
    waitTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    _count?: QueueHistoryCountOrderByAggregateInput
    _avg?: QueueHistoryAvgOrderByAggregateInput
    _max?: QueueHistoryMaxOrderByAggregateInput
    _min?: QueueHistoryMinOrderByAggregateInput
    _sum?: QueueHistorySumOrderByAggregateInput
  }

  export type QueueHistoryScalarWhereWithAggregatesInput = {
    AND?: QueueHistoryScalarWhereWithAggregatesInput | QueueHistoryScalarWhereWithAggregatesInput[]
    OR?: QueueHistoryScalarWhereWithAggregatesInput[]
    NOT?: QueueHistoryScalarWhereWithAggregatesInput | QueueHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QueueHistory"> | number
    userId?: IntWithAggregatesFilter<"QueueHistory"> | number
    serviceId?: IntWithAggregatesFilter<"QueueHistory"> | number
    serviceName?: StringWithAggregatesFilter<"QueueHistory"> | string
    userName?: StringWithAggregatesFilter<"QueueHistory"> | string
    userCode?: StringWithAggregatesFilter<"QueueHistory"> | string
    waitTime?: IntNullableWithAggregatesFilter<"QueueHistory"> | number | null
    status?: StringWithAggregatesFilter<"QueueHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"QueueHistory"> | Date | string
    completedAt?: DateTimeWithAggregatesFilter<"QueueHistory"> | Date | string
  }

  export type UserCreateInput = {
    studentCode: string
    email?: string | null
    password: string
    name: string
    course: string
    year: number
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    queueEntries?: QueueEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    studentCode: string
    email?: string | null
    password: string
    name: string
    course: string
    year: number
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    queueEntries?: QueueEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    studentCode?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: QueueEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentCode?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: QueueEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    studentCode: string
    email?: string | null
    password: string
    name: string
    course: string
    year: number
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    studentCode?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentCode?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    queueEntries?: QueueEntryCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    queueEntries?: QueueEntryUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: QueueEntryUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: QueueEntryUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueEntryCreateInput = {
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
    service: ServiceCreateNestedOneWithoutQueueEntriesInput
    user: UserCreateNestedOneWithoutQueueEntriesInput
  }

  export type QueueEntryUncheckedCreateInput = {
    id?: number
    userId: number
    serviceId: number
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type QueueEntryUpdateInput = {
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    service?: ServiceUpdateOneRequiredWithoutQueueEntriesNestedInput
    user?: UserUpdateOneRequiredWithoutQueueEntriesNestedInput
  }

  export type QueueEntryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueEntryCreateManyInput = {
    id?: number
    userId: number
    serviceId: number
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type QueueEntryUpdateManyMutationInput = {
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueEntryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueHistoryCreateInput = {
    userId: number
    serviceId: number
    serviceName: string
    userName: string
    userCode: string
    waitTime?: number | null
    status: string
    createdAt?: Date | string
    completedAt: Date | string
  }

  export type QueueHistoryUncheckedCreateInput = {
    id?: number
    userId: number
    serviceId: number
    serviceName: string
    userName: string
    userCode: string
    waitTime?: number | null
    status: string
    createdAt?: Date | string
    completedAt: Date | string
  }

  export type QueueHistoryUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    waitTime?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    waitTime?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueHistoryCreateManyInput = {
    id?: number
    userId: number
    serviceId: number
    serviceName: string
    userName: string
    userCode: string
    waitTime?: number | null
    status: string
    createdAt?: Date | string
    completedAt: Date | string
  }

  export type QueueHistoryUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    waitTime?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceName?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    waitTime?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type QueueEntryListRelationFilter = {
    every?: QueueEntryWhereInput
    some?: QueueEntryWhereInput
    none?: QueueEntryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QueueEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    studentCode?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    course?: SortOrder
    year?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    studentCode?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    course?: SortOrder
    year?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    studentCode?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    course?: SortOrder
    year?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumQueueStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusFilter<$PrismaModel> | $Enums.QueueStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type QueueEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    positionNumber?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    actualWaitTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    servedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QueueEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    positionNumber?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    actualWaitTime?: SortOrder
  }

  export type QueueEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    positionNumber?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    actualWaitTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    servedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QueueEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    positionNumber?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    actualWaitTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    servedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QueueEntrySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    positionNumber?: SortOrder
    priority?: SortOrder
    estimatedTime?: SortOrder
    actualWaitTime?: SortOrder
  }

  export type EnumQueueStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusWithAggregatesFilter<$PrismaModel> | $Enums.QueueStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQueueStatusFilter<$PrismaModel>
    _max?: NestedEnumQueueStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type QueueHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    serviceName?: SortOrder
    userName?: SortOrder
    userCode?: SortOrder
    waitTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QueueHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    waitTime?: SortOrder
  }

  export type QueueHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    serviceName?: SortOrder
    userName?: SortOrder
    userCode?: SortOrder
    waitTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QueueHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    serviceName?: SortOrder
    userName?: SortOrder
    userCode?: SortOrder
    waitTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QueueHistorySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    serviceId?: SortOrder
    waitTime?: SortOrder
  }

  export type QueueEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
  }

  export type QueueEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type QueueEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    upsert?: QueueEntryUpsertWithWhereUniqueWithoutUserInput | QueueEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    set?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    disconnect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    delete?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    update?: QueueEntryUpdateWithWhereUniqueWithoutUserInput | QueueEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QueueEntryUpdateManyWithWhereWithoutUserInput | QueueEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
  }

  export type QueueEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    upsert?: QueueEntryUpsertWithWhereUniqueWithoutUserInput | QueueEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    set?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    disconnect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    delete?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    update?: QueueEntryUpdateWithWhereUniqueWithoutUserInput | QueueEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QueueEntryUpdateManyWithWhereWithoutUserInput | QueueEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
  }

  export type QueueEntryCreateNestedManyWithoutServiceInput = {
    create?: XOR<QueueEntryCreateWithoutServiceInput, QueueEntryUncheckedCreateWithoutServiceInput> | QueueEntryCreateWithoutServiceInput[] | QueueEntryUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutServiceInput | QueueEntryCreateOrConnectWithoutServiceInput[]
    createMany?: QueueEntryCreateManyServiceInputEnvelope
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
  }

  export type QueueEntryUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<QueueEntryCreateWithoutServiceInput, QueueEntryUncheckedCreateWithoutServiceInput> | QueueEntryCreateWithoutServiceInput[] | QueueEntryUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutServiceInput | QueueEntryCreateOrConnectWithoutServiceInput[]
    createMany?: QueueEntryCreateManyServiceInputEnvelope
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
  }

  export type QueueEntryUpdateManyWithoutServiceNestedInput = {
    create?: XOR<QueueEntryCreateWithoutServiceInput, QueueEntryUncheckedCreateWithoutServiceInput> | QueueEntryCreateWithoutServiceInput[] | QueueEntryUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutServiceInput | QueueEntryCreateOrConnectWithoutServiceInput[]
    upsert?: QueueEntryUpsertWithWhereUniqueWithoutServiceInput | QueueEntryUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: QueueEntryCreateManyServiceInputEnvelope
    set?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    disconnect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    delete?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    update?: QueueEntryUpdateWithWhereUniqueWithoutServiceInput | QueueEntryUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: QueueEntryUpdateManyWithWhereWithoutServiceInput | QueueEntryUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
  }

  export type QueueEntryUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<QueueEntryCreateWithoutServiceInput, QueueEntryUncheckedCreateWithoutServiceInput> | QueueEntryCreateWithoutServiceInput[] | QueueEntryUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutServiceInput | QueueEntryCreateOrConnectWithoutServiceInput[]
    upsert?: QueueEntryUpsertWithWhereUniqueWithoutServiceInput | QueueEntryUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: QueueEntryCreateManyServiceInputEnvelope
    set?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    disconnect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    delete?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    update?: QueueEntryUpdateWithWhereUniqueWithoutServiceInput | QueueEntryUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: QueueEntryUpdateManyWithWhereWithoutServiceInput | QueueEntryUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
  }

  export type ServiceCreateNestedOneWithoutQueueEntriesInput = {
    create?: XOR<ServiceCreateWithoutQueueEntriesInput, ServiceUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutQueueEntriesInput
    connect?: ServiceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutQueueEntriesInput = {
    create?: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQueueEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumQueueStatusFieldUpdateOperationsInput = {
    set?: $Enums.QueueStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ServiceUpdateOneRequiredWithoutQueueEntriesNestedInput = {
    create?: XOR<ServiceCreateWithoutQueueEntriesInput, ServiceUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutQueueEntriesInput
    upsert?: ServiceUpsertWithoutQueueEntriesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutQueueEntriesInput, ServiceUpdateWithoutQueueEntriesInput>, ServiceUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type UserUpdateOneRequiredWithoutQueueEntriesNestedInput = {
    create?: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQueueEntriesInput
    upsert?: UserUpsertWithoutQueueEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQueueEntriesInput, UserUpdateWithoutQueueEntriesInput>, UserUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumQueueStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusFilter<$PrismaModel> | $Enums.QueueStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumQueueStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusWithAggregatesFilter<$PrismaModel> | $Enums.QueueStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQueueStatusFilter<$PrismaModel>
    _max?: NestedEnumQueueStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type QueueEntryCreateWithoutUserInput = {
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
    service: ServiceCreateNestedOneWithoutQueueEntriesInput
  }

  export type QueueEntryUncheckedCreateWithoutUserInput = {
    id?: number
    serviceId: number
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type QueueEntryCreateOrConnectWithoutUserInput = {
    where: QueueEntryWhereUniqueInput
    create: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput>
  }

  export type QueueEntryCreateManyUserInputEnvelope = {
    data: QueueEntryCreateManyUserInput | QueueEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QueueEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: QueueEntryWhereUniqueInput
    update: XOR<QueueEntryUpdateWithoutUserInput, QueueEntryUncheckedUpdateWithoutUserInput>
    create: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput>
  }

  export type QueueEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: QueueEntryWhereUniqueInput
    data: XOR<QueueEntryUpdateWithoutUserInput, QueueEntryUncheckedUpdateWithoutUserInput>
  }

  export type QueueEntryUpdateManyWithWhereWithoutUserInput = {
    where: QueueEntryScalarWhereInput
    data: XOR<QueueEntryUpdateManyMutationInput, QueueEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type QueueEntryScalarWhereInput = {
    AND?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
    OR?: QueueEntryScalarWhereInput[]
    NOT?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
    id?: IntFilter<"QueueEntry"> | number
    userId?: IntFilter<"QueueEntry"> | number
    serviceId?: IntFilter<"QueueEntry"> | number
    positionNumber?: IntFilter<"QueueEntry"> | number
    status?: EnumQueueStatusFilter<"QueueEntry"> | $Enums.QueueStatus
    priority?: IntFilter<"QueueEntry"> | number
    estimatedTime?: IntNullableFilter<"QueueEntry"> | number | null
    actualWaitTime?: IntNullableFilter<"QueueEntry"> | number | null
    notes?: StringNullableFilter<"QueueEntry"> | string | null
    createdAt?: DateTimeFilter<"QueueEntry"> | Date | string
    updatedAt?: DateTimeFilter<"QueueEntry"> | Date | string
    servedAt?: DateTimeNullableFilter<"QueueEntry"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"QueueEntry"> | Date | string | null
  }

  export type QueueEntryCreateWithoutServiceInput = {
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutQueueEntriesInput
  }

  export type QueueEntryUncheckedCreateWithoutServiceInput = {
    id?: number
    userId: number
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type QueueEntryCreateOrConnectWithoutServiceInput = {
    where: QueueEntryWhereUniqueInput
    create: XOR<QueueEntryCreateWithoutServiceInput, QueueEntryUncheckedCreateWithoutServiceInput>
  }

  export type QueueEntryCreateManyServiceInputEnvelope = {
    data: QueueEntryCreateManyServiceInput | QueueEntryCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type QueueEntryUpsertWithWhereUniqueWithoutServiceInput = {
    where: QueueEntryWhereUniqueInput
    update: XOR<QueueEntryUpdateWithoutServiceInput, QueueEntryUncheckedUpdateWithoutServiceInput>
    create: XOR<QueueEntryCreateWithoutServiceInput, QueueEntryUncheckedCreateWithoutServiceInput>
  }

  export type QueueEntryUpdateWithWhereUniqueWithoutServiceInput = {
    where: QueueEntryWhereUniqueInput
    data: XOR<QueueEntryUpdateWithoutServiceInput, QueueEntryUncheckedUpdateWithoutServiceInput>
  }

  export type QueueEntryUpdateManyWithWhereWithoutServiceInput = {
    where: QueueEntryScalarWhereInput
    data: XOR<QueueEntryUpdateManyMutationInput, QueueEntryUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceCreateWithoutQueueEntriesInput = {
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUncheckedCreateWithoutQueueEntriesInput = {
    id?: number
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutQueueEntriesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutQueueEntriesInput, ServiceUncheckedCreateWithoutQueueEntriesInput>
  }

  export type UserCreateWithoutQueueEntriesInput = {
    studentCode: string
    email?: string | null
    password: string
    name: string
    course: string
    year: number
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutQueueEntriesInput = {
    id?: number
    studentCode: string
    email?: string | null
    password: string
    name: string
    course: string
    year: number
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutQueueEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
  }

  export type ServiceUpsertWithoutQueueEntriesInput = {
    update: XOR<ServiceUpdateWithoutQueueEntriesInput, ServiceUncheckedUpdateWithoutQueueEntriesInput>
    create: XOR<ServiceCreateWithoutQueueEntriesInput, ServiceUncheckedCreateWithoutQueueEntriesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutQueueEntriesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutQueueEntriesInput, ServiceUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type ServiceUpdateWithoutQueueEntriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateWithoutQueueEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutQueueEntriesInput = {
    update: XOR<UserUpdateWithoutQueueEntriesInput, UserUncheckedUpdateWithoutQueueEntriesInput>
    create: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQueueEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQueueEntriesInput, UserUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type UserUpdateWithoutQueueEntriesInput = {
    studentCode?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutQueueEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentCode?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueEntryCreateManyUserInput = {
    id?: number
    serviceId: number
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type QueueEntryUpdateWithoutUserInput = {
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    service?: ServiceUpdateOneRequiredWithoutQueueEntriesNestedInput
  }

  export type QueueEntryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueEntryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueEntryCreateManyServiceInput = {
    id?: number
    userId: number
    positionNumber: number
    status?: $Enums.QueueStatus
    priority?: number
    estimatedTime?: number | null
    actualWaitTime?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    servedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type QueueEntryUpdateWithoutServiceInput = {
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutQueueEntriesNestedInput
  }

  export type QueueEntryUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueEntryUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    positionNumber?: IntFieldUpdateOperationsInput | number
    status?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    priority?: IntFieldUpdateOperationsInput | number
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    actualWaitTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}