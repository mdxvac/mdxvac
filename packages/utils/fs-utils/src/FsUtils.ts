export interface FsUtils {
  /**
   * Check if path exists
   * @param name path name
   * @returns true if path exists
   */
  exists(name: string): Promise<boolean>;

  /**
   * Find a file with given `name` in the directory `dir` or parent directories,
   * optionally stopping in directory `stop`.
   * @param name file to find
   * @param dir directory to start
   * @param stop (optional) directory to stop
   * @returns path of file, if found, `undefined` otherwise
   */
  findUp: (name: string, dir: string, stop?: string) => Promise<string | undefined>;

  /**
   * Find all files with given `name` in the directory `dir` or parent
   * directories, stopping in directory `stop`.
   *
   * The order is top-down
   *
   * @param name file to find
   * @param dir directory to start
   * @param stop directory to stop
   * @returns array of files from top to bottom, might be empty
   */
  findUpAll: (name: string, dir: string, stop: string) => Promise<string[]>;
}
