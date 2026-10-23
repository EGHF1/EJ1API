namespace EJ1API;

public sealed class Result<T>
{
    private Result(bool isSuccess, T? value, IReadOnlyCollection<string> errors)
    {
        IsSuccess = isSuccess;
        Value = value;
        Errors = errors;
    }

    public bool IsSuccess { get; }
    public T? Value { get; }
    public IReadOnlyCollection<string> Errors { get; }

    public static Result<T> Success(T value) =>
        new(true, value, Array.Empty<string>());

    public static Result<T> Failure(IEnumerable<string> errors) =>
        new(false, default, errors.ToArray());
}
