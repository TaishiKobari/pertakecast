export type OverwriteNest<
  T,
  U extends { [Key in keyof T]?: unknown }
> = T extends {
  [Key in keyof U]?: any
}
  ? Omit<
      {
        [K in keyof T]: T[K] extends object ? OverwriteNest<T[K], U> : T[K]
      },
      keyof U
    > &
      U
  : {
      [K in keyof T]: T[K] extends object ? OverwriteNest<T[K], U> : T[K]
    }
